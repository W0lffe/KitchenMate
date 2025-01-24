import java.util.ArrayList;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextArea;
import javafx.scene.Node;

public class RecipeList {
    
    private static ArrayList<Recipe> recipes;
    private static ArrayList<Product> ingredientList = new ArrayList<>();

    public static void showRecipes(){

        recipes = HTTP.fetchRecipes("recipes");
        VBox rootContainer = Main.root.getRootCenter();

        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }
        Label listLabel = new Label("BROWSE RECIPES");

        ScrollPane scrollContainer = new ScrollPane();
        scrollContainer.setMaxSize(Main.getRoot().getRootCenter().getWidth()*0.9,Main.getRoot().getRootCenter().getHeight());
        scrollContainer.setFitToWidth(true);
      
        VBox recipeContainer = new VBox(10);
        scrollContainer.setContent(recipeContainer);

        for (Recipe recipe : recipes) {
            VBox container = new VBox(10);

            String recipeName = recipe.getName();
            String portions = "Portions: " + Integer.toString(recipe.getPortions());
            String ingredients = "Ingredients: " + Integer.toString(recipe.getIngredientAmount());

            RecipeContainer recipeBox = new RecipeContainer(50, recipeName, portions, ingredients, "Expand", "Add");
            
            RecipeDetails recipeDetailsContainer = new RecipeDetails();
            recipeDetailsContainer.addDetails(recipe);
        
            recipeBox.getExpandButton().setOnAction(event -> {

                if(!container.getChildren().contains(recipeDetailsContainer)){
                    container.getChildren().add(recipeDetailsContainer);
                }
                else{
                    container.getChildren().remove(recipeDetailsContainer);
                } 
              
            });

            recipeBox.getAddToBasketButton().setOnAction(e-> { Modal.initListModal(recipe.getIngredients()); });

            container.getChildren().add(recipeBox);
            recipeContainer.getChildren().add(container);;
        }

        rootContainer.getChildren().addAll(listLabel, scrollContainer);
        }

        public static ArrayList<Product> getList(){
            return ingredientList;
        }
}

class RecipeContainer extends HBox{

    private HBox recipeHBox;
    private HBox portionsHBox;
    private HBox ingredAmountHBox;
    private HBox buttonHBox;
    private Button expandButton;
    private Button addToBasketButton;

    public RecipeContainer(double spacing, String recipe, String portionAmount, String ingredientQuantity, String expandButtonLabel, String addToBasketLabel) {
        super(spacing);
        this.recipeHBox = new HBox(10, new Label(recipe));
        this.portionsHBox = new HBox(10, new Label(portionAmount));
        this.ingredAmountHBox = new HBox(10, new Label(ingredientQuantity));
        this.expandButton = new Button(expandButtonLabel);
        this.addToBasketButton = new Button(addToBasketLabel);
        this.buttonHBox = new HBox(10);

        this.buttonHBox.getChildren().addAll(expandButton, addToBasketButton);

        this.recipeHBox.setAlignment(Pos.CENTER);
        this.recipeHBox.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.25, Main.getRoot().getRootCenter().getHeight()*0.10);
        
        this.portionsHBox.setAlignment(Pos.CENTER);
        this.portionsHBox.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.25, Main.getRoot().getRootCenter().getHeight()*0.10);

        this.ingredAmountHBox.setAlignment(Pos.CENTER);
        this.ingredAmountHBox.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.25, Main.getRoot().getRootCenter().getHeight()*0.10);

        this.buttonHBox.setAlignment(Pos.CENTER);
        this.buttonHBox.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.25, Main.getRoot().getRootCenter().getHeight()*0.10);

        this.getChildren().addAll(recipeHBox, portionsHBox, ingredAmountHBox, buttonHBox);
    }

    public Button getExpandButton() {
        return expandButton;
    }

    public Button getAddToBasketButton() {
        return addToBasketButton;
    }

}

class RecipeDetails extends ScrollPane{

    private HBox container;
    private VBox detailsContainer;
    private VBox instructionsContainer;
    private VBox modifyContainer;
    private Button modifyButton;
    private Button deleteButton;
    private boolean modifyInProgress = false;

    public RecipeDetails() {
        this.container = new HBox(10);
        this.setContent(container);
        this.setFitToWidth(true);
        this.setFitToHeight(true);
        this.modifyButton = new Button("Edit");
        this.deleteButton = new Button("Delete");

        this.detailsContainer = new VBox(10);
        this.detailsContainer.setPrefWidth(Main.getRoot().getRootCenter().getWidth()*0.33);
        this.detailsContainer.setMaxHeight(Main.getRoot().getRootCenter().getHeight()*0.33);
        this.detailsContainer.setAlignment(Pos.TOP_CENTER);

        this.instructionsContainer = new VBox(10);
        this.instructionsContainer.setPrefWidth(Main.getRoot().getRootCenter().getWidth()*0.33);
        this.instructionsContainer.setMaxHeight(Main.getRoot().getRootCenter().getHeight()*0.33);
        this.instructionsContainer.setAlignment(Pos.TOP_CENTER);

        this.modifyContainer = new VBox(10);
        this.modifyContainer.setPrefWidth(Main.getRoot().getRootCenter().getWidth()*0.33);
        this.modifyContainer.setMaxHeight(Main.getRoot().getRootCenter().getHeight()*0.33);
        this.modifyContainer.setAlignment(Pos.TOP_CENTER);
        this.modifyContainer.getChildren().addAll(modifyButton, deleteButton);

        this.container.getChildren().addAll(detailsContainer, instructionsContainer, modifyContainer);
    }

    public void addDetails(Recipe recipe){
        Label ingredientsLabel = new Label("Ingredients:");
        Label instructionsLabel = new Label("Instructions:");
        ingredientsLabel.setUnderline(true);
        instructionsLabel.setUnderline(true);
        
        this.detailsContainer.getChildren().add(ingredientsLabel);
        
        for (Product ingredient : recipe.getIngredients()) {
            Label newIngredient = new Label(ingredient.toString());
            this.detailsContainer.getChildren().add(newIngredient);
        }

        this.instructionsContainer.getChildren().add(instructionsLabel);
        Label instructions = new Label(recipe.getInstructions());
        instructions.setWrapText(true);
        this.instructionsContainer.getChildren().add(instructions);

        this.modifyButton.setOnAction(event -> {
            if(this.modifyInProgress == false){
                this.editDetails(recipe, ingredientsLabel, instructionsLabel);
                this.modifyInProgress = true;
            }
        });

        this.deleteButton.setOnAction(event -> {

            HTTP.deleteData(recipe.getId());
            RecipeList.showRecipes();
        });

    }

    private void editDetails(Recipe recipe, Label ingredientsLabel, Label instructionsLabel){
        this.detailsContainer.getChildren().clear();
        this.instructionsContainer.getChildren().clear();
        this.modifyContainer.getChildren().clear();

        this.detailsContainer.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.50, Main.getRoot().getRootCenter().getHeight()*0.10);

        this.detailsContainer.getChildren().add(ingredientsLabel);
        this.instructionsContainer.getChildren().add(instructionsLabel);
        Button saveButton = new Button("SAVE");
        Button addIngredientButton = new Button("NEW INGREDIENT");
        this.modifyContainer.getChildren().addAll(saveButton, addIngredientButton);

        for (Product ingredient : recipe.getIngredients()) {

            IngredientHBox editableIngredientBox = new IngredientHBox(10, this.detailsContainer);
            editableIngredientBox.getIngredient().setText(ingredient.getName());
            editableIngredientBox.getQuantity().setText(Double.toString(ingredient.getQuantity()));
            editableIngredientBox.getUnit().setValue(ingredient.getUnit());

            this.detailsContainer.getChildren().add(editableIngredientBox);
        }

        TextArea instructions = new TextArea(recipe.getInstructions());
        this.instructionsContainer.getChildren().add(instructions);

        addIngredientButton.setOnAction(e -> {
            this.detailsContainer.getChildren().add(new IngredientHBox(10, this.detailsContainer));
        });

        saveButton.setOnAction(event -> {
            ArrayList<Product> newIngredients = new ArrayList<>();

            for (Node node : this.detailsContainer.getChildren()) {
                if(node instanceof IngredientHBox){
                    IngredientHBox newIngredient = (IngredientHBox) node;

                    Product collectedIng = Recipe.collectIngredients(newIngredient);
                    if(collectedIng == null){
                        return;
                    }
                    else{
                        newIngredients.add(collectedIng);
                    }
                }
            }

            recipe.setIngredientAmount(newIngredients.size());
            recipe.setIngredients(newIngredients);
            recipe.setInstructions(instructions.getText());
            //System.out.println("After saving:");
            //System.out.println(recipe);

            Modal.initInfoModal(HTTP.saveRecipe(recipe, "recipes"));
            //SAVE DATA AND SEND TO SERVER, REFRESH LIST

            RecipeList.showRecipes();
        });

    }


}



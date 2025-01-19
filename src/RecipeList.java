import java.util.ArrayList;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class RecipeList {
    
    private static ArrayList<Recipe> recipes;
    private static ArrayList<Ingredient> ingredientList = new ArrayList<>();

    public static void showRecipes(){

        recipes = HTTP.fetchRecipes();
        VBox rootContainer = Main.root.getRootCenter();

        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }
        Label listLabel = new Label("BROWSE RECIPES");

        ScrollPane scrollContainer = new ScrollPane();
        scrollContainer.setFitToWidth(true);
      
        VBox recipeContainer = new VBox(10);
        scrollContainer.setContent(recipeContainer);

        for (Recipe recipe : recipes) {
            VBox container = new VBox(10);

            String recipeName = recipe.getName();
            String portions = "Portions: " + Integer.toString(recipe.getPortions());
            String ingredients = "Ingredients: " + Integer.toString(recipe.getIngredientAmount());

            RecipeContainer recipeBox = new RecipeContainer(50, recipeName, portions, ingredients, "Expand", "Add");
            
            RecipeDetails detailsContainer = new RecipeDetails();
            detailsContainer.addDetails(recipe);
        
            recipeBox.getExpandButton().setOnAction(event -> {

                if(!container.getChildren().contains(detailsContainer)){
                    container.getChildren().add(detailsContainer);
                }
                else{
                    container.getChildren().remove(detailsContainer);
                } 
              
            });

            recipeBox.getAddToBasketButton().setOnAction(e-> {
                for (String ingredient : recipe.getIngredients()) {
                    String[] splitString = ingredient.split(" ");
                    System.out.println(Double.parseDouble(splitString[1]));
                    Ingredient createdIngredient = new Ingredient(splitString[0], Double.parseDouble(splitString[1]), splitString[2]);
                    
                    boolean isDuplicate = false;

                    for(Ingredient ing : ingredientList){
                        if(ing.getName().equals(createdIngredient.getName())){
                            isDuplicate = true;
                            double sum = ing.getQuantity() + createdIngredient.getQuantity();
                            ing.setQuantity(sum);
                            break;
                        }
                    }

                    if(!isDuplicate){
                        ingredientList.add(createdIngredient);
                    }

                }

                System.out.println(ingredientList);
            });

            container.getChildren().add(recipeBox);
            recipeContainer.getChildren().add(container);;
        }

        rootContainer.getChildren().addAll(listLabel, scrollContainer);
        }

        public static ArrayList<Ingredient> getList(){
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
        this.recipeHBox = new HBox(new Label(recipe));
        this.portionsHBox = new HBox(new Label(portionAmount));
        this.ingredAmountHBox = new HBox(new Label(ingredientQuantity));
        this.expandButton = new Button(expandButtonLabel);
        this.addToBasketButton = new Button(addToBasketLabel);
        this.buttonHBox = new HBox(10);

        this.buttonHBox.getChildren().addAll(expandButton, addToBasketButton);

        this.recipeHBox.setAlignment(Pos.CENTER);
        this.recipeHBox.setPrefSize(150, 50);
        
        this.portionsHBox.setAlignment(Pos.CENTER);
        this.portionsHBox.setPrefSize(150, 50);

        this.ingredAmountHBox.setAlignment(Pos.CENTER);
        this.ingredAmountHBox.setPrefSize(150, 50);

        this.buttonHBox.setAlignment(Pos.CENTER);
        this.buttonHBox.setPrefSize(150, 50);

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
        this.instructionsContainer = new VBox(10);
        this.modifyContainer = new VBox(10);
        this.modifyContainer.getChildren().addAll(modifyButton, deleteButton);

        this.container.getChildren().addAll(detailsContainer, instructionsContainer, modifyContainer);
    }

    public void addDetails(Recipe recipe){
        Label ingredientsLabel = new Label("Ingredients:");
        Label instructionsLabel = new Label("Instructions:");
        ingredientsLabel.setUnderline(true);
        instructionsLabel.setUnderline(true);
        
        this.detailsContainer.setPrefSize(250, 50);
        this.detailsContainer.setAlignment(Pos.TOP_CENTER);
        this.instructionsContainer.setPrefSize(250, 50);
        this.instructionsContainer.setAlignment(Pos.TOP_CENTER);
        this.modifyContainer.setPrefSize(250, 50);
        this.modifyContainer.setAlignment(Pos.TOP_CENTER);

        this.detailsContainer.getChildren().add(ingredientsLabel);
        
        for (String ingredient : recipe.getIngredients()) {
            Label newIngredient = new Label(ingredient);
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
            else{
                Interface.getStatusField().setText("Editing already in progress!");
            }
        });

    }

    private void editDetails(Recipe recipe, Label ingredientsLabel, Label instructionsLabel){
        System.out.println(recipe.getId());

        this.detailsContainer.getChildren().clear();
        this.instructionsContainer.getChildren().clear();
        this.modifyContainer.getChildren().clear();

        this.detailsContainer.getChildren().add(ingredientsLabel);
        this.instructionsContainer.getChildren().add(instructionsLabel);
        Button saveButton = new Button("Save");
        this.modifyContainer.getChildren().add(saveButton);

        this.detailsContainer.setPrefSize(400, 50);
        this.instructionsContainer.setPrefSize(400, 50);

        for (String ingredient : recipe.getIngredients()) {
            String[] splitIngredient =  ingredient.split(" ");

            IngredientHBox editableIngredientBox = new IngredientHBox(10, this.detailsContainer);
            editableIngredientBox.getIngredient().setText(splitIngredient[0]);
            editableIngredientBox.getQuantity().setText(splitIngredient[1]);
            editableIngredientBox.getUnit().setValue(splitIngredient[2]);

            this.detailsContainer.getChildren().add(editableIngredientBox);
        }

        this.instructionsContainer.getChildren().add(new TextArea(recipe.getInstructions()));

        saveButton.setOnAction(event -> {
            //SAVE DATA AND SEND TO SERVER, REFRESH LIST

            RecipeList.showRecipes();
        });

    }


}



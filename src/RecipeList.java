import java.util.ArrayList;

import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;

public class RecipeList {
    
    private static ArrayList<Recipe> recipes;

    public static void showRecipes(){

        recipes = HTTP.fetchRecipes();
        VBox rootContainer = Main.root.getRootCenter();
        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }

        ScrollPane scrollContainer = new ScrollPane();
      
        VBox recipeContainer = new VBox(10);
        scrollContainer.setContent(recipeContainer);

        for (Recipe recipe : recipes) {
            VBox container = new VBox(10);

            String recipeName = recipe.getName();
            String portions = "Portions: " + Integer.toString(recipe.getPortions());
            String ingredients = "Ingredients: " + Integer.toString(recipe.getIngredientAmount());

            RecipeContainer recipeBox = new RecipeContainer(50, recipeName, portions, ingredients, "Expand");
            
            RecipeDetails detailsContainer = new RecipeDetails();
            detailsContainer.addDetails(recipe);
        
            recipeBox.getButton().setOnAction(event -> {

                if(!container.getChildren().contains(detailsContainer)){
                    container.getChildren().add(detailsContainer);
                }
                else{
                    container.getChildren().remove(detailsContainer);
                }
              
            });
            container.getChildren().add(recipeBox);
            recipeContainer.getChildren().add(container);;
        }

        rootContainer.getChildren().add(scrollContainer);
        }
 
}

class RecipeContainer extends HBox{

    private HBox recipeHBox;
    private HBox portionsHBox;
    private HBox ingredAmountHBox;
    private HBox buttonHBox;
    private Button button;
    
    public RecipeContainer(double spacing, String recipe, String portionAmount, String ingredientQuantity, String buttonLabel) {
        super(spacing);
        this.recipeHBox = new HBox(new Label(recipe));
        this.portionsHBox = new HBox(new Label(portionAmount));
        this.ingredAmountHBox = new HBox(new Label(ingredientQuantity));
        this.button = new Button(buttonLabel);
        this.buttonHBox = new HBox(button);

        this.recipeHBox.setAlignment(Pos.CENTER);
        this.recipeHBox.setPrefSize(150, 50);
        
        this.portionsHBox.setAlignment(Pos.CENTER);
        this.portionsHBox.setPrefSize(150, 50);

        this.ingredAmountHBox.setAlignment(Pos.CENTER);
        this.ingredAmountHBox.setPrefSize(150, 50);

        this.buttonHBox.setAlignment(Pos.CENTER);
        this.ingredAmountHBox.setPrefSize(150, 50);

        this.getChildren().addAll(recipeHBox, portionsHBox, ingredAmountHBox, buttonHBox);
    }

    public Button getButton() {
        return button;
    }

}

class RecipeDetails extends ScrollPane{

    private HBox container;
    private VBox detailsContainer;
    private VBox instructionsContainer;

    public RecipeDetails() {
        this.container = new HBox(10);
        this.setContent(container);
        this.setFitToWidth(true);
        this.setFitToHeight(true);


        this.detailsContainer = new VBox(10);
        this.instructionsContainer = new VBox(10);
        this.container.getChildren().addAll(detailsContainer, instructionsContainer);
    }



    public void addDetails(Recipe recipe){
        Label recipeLabel = new Label(recipe.getName());
        Label portions = new Label("Portions: " + Integer.toString(recipe.getPortions()));
        
        this.detailsContainer.setPrefSize(400, 200);
        this.detailsContainer.setAlignment(Pos.CENTER_LEFT);
        this.instructionsContainer.setAlignment(Pos.CENTER_LEFT);

        this.detailsContainer.getChildren().addAll(recipeLabel, portions);
        for (String ingredient : recipe.getIngredients()) {
            Label newIngredient = new Label(ingredient);
            this.detailsContainer.getChildren().add(newIngredient);
        }

        this.instructionsContainer.getChildren().add(new Label("Instructions: "));
        this.instructionsContainer.getChildren().add(new Label(recipe.getInstructions()));
    }

}



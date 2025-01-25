import javafx.scene.layout.VBox;
import javafx.scene.layout.HBox;
import javafx.scene.control.ScrollPane;
import javafx.geometry.Pos;
import java.util.ArrayList;

public class RecipeListView extends HBox {

    private VBox recipeListContainer;
    private ScrollPane recipeListScroll;

    public RecipeListView(double spacing) {
        super(spacing);
        this.recipeListContainer = new VBox(30);
        this.recipeListScroll = new ScrollPane(recipeListContainer);

        this.setAlignment(Pos.CENTER);
        this.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.9, Main.getRoot().getRootRightContainer().getHeight()*0.9);
        this.recipeListContainer.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.9, Main.getRoot().getRootRightContainer().getHeight()*0.9);
        this.recipeListScroll.setFitToWidth(true);

        this.getChildren().add(recipeListScroll);

    }

    public void populateList(ArrayList<Recipe> recipeList){

        for (Recipe recipe : recipeList) {
            String name = recipe.getRecipeName();
            String portions = Integer.toString(recipe.getPortions());
            String ingredients = Integer.toString(recipe.getIngredientAmount());

            RecipeContainer containerToAdd = new RecipeContainer(name, portions, ingredients);

            RecipeDetails recipeDetails = new RecipeDetails(20);
            recipeDetails.addDetails(recipe);

            containerToAdd.getShowDetails().setOnAction(e -> {
                if (!containerToAdd.getChildren().contains(recipeDetails)) {
                    containerToAdd.getChildren().add(recipeDetails);
                }
                else{
                    containerToAdd.getChildren().remove(recipeDetails);
                }
            });

            containerToAdd.getAddButton().setOnAction(e -> {

            });

            this.recipeListContainer.getChildren().add(containerToAdd);
        }
    }



}



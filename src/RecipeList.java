import java.util.ArrayList;

import javafx.scene.layout.VBox;
import javafx.scene.control.Label;

public class RecipeList {

    private static ArrayList<Recipe> recipes = new ArrayList<>();

    public static void initRecipeList(){

        VBox mainRootRight = Main.getRoot().getRootRightContainer();
        Main.clearRootRight();

        recipes = HTTP.fetchRecipes("Recipe");

        RecipeListView recipeList = new RecipeListView(10);
        recipeList.populateList(recipes);

        mainRootRight.getChildren().addAll(new Label("BROWSE RECIPES"), recipeList);

    }
}

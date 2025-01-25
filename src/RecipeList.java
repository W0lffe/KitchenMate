import java.util.ArrayList;

import javafx.scene.layout.VBox;

public class RecipeList {

    private static ArrayList<Recipe> recipes = new ArrayList<>();

    public static void initRecipeList(){

        VBox mainRootRight = Main.getRoot().getRootRightContainer();
        Main.clearRootRight();

        recipes = HTTP.fetchRecipes("recipes");

        RecipeListView recipeList = new RecipeListView(10);
        recipeList.populateList(recipes);

        mainRootRight.getChildren().addAll(recipeList);

    }
}

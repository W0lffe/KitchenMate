import javafx.scene.layout.VBox;

public class RecipeList {
    
    public static void showRecipes(){

        VBox rootContainer = Main.root.getRootCenter();

        for (Recipe recipeInList  : Recipe.recipeList) {
            String amount = String.valueOf(recipeInList.getIngredientAmount());
            String quantity = String.valueOf(recipeInList.getPortions());

            rootContainer.getChildren().add(new RecipeHBox(10, recipeInList.getName(), amount, quantity));
        }

    }
}

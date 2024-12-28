import java.util.ArrayList;

import javafx.scene.layout.VBox;

public class RecipeList {
    
    private static ArrayList<Recipe> recipes = new ArrayList<>();

    public static void showRecipes(){

        recipes = HTTP.fetchRecipes();
        VBox rootContainer = Main.root.getRootCenter();

          
        }
 
    }


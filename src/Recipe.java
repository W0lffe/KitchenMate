import java.util.ArrayList;
import javafx.scene.Node;
import javafx.scene.layout.VBox;
import javafx.scene.control.TextField;;


public class Recipe {
    
    public static ArrayList<Recipe> recipeList = new ArrayList<>();
    private String name;
    private int portions;
    private int ingredientAmount;
    private ArrayList<String> ingredients;
    private String instructions;
    
    public Recipe(String name, int portions, int ingredientAmount, ArrayList<String> ingredients, String instructions) {
        this.name = name;
        this.portions = portions;
        this.ingredientAmount = ingredientAmount;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPortions() {
        return portions;
    }

    public void setPortions(int portions) {
        this.portions = portions;
    }

    public int getIngredientAmount() {
        return ingredientAmount;
    }

    public void setIngredientAmount(int ingredientAmount) {
        this.ingredientAmount = ingredientAmount;
    }

    public ArrayList<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(ArrayList<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    @Override
    public String toString() {
                return "Recipe [" +
                "name='" + name + '\'' +
                ", portions=" + portions +
                ", ingredientAmount=" + ingredientAmount +
                ", ingredients=" + ingredients +
                ", instructions=" + instructions +
                "]"
                ;
    }

    public static void createRecipe(){
        TextField status = Interface.getStatusField();
        ArrayList<String> ingredients = new ArrayList<String>();
        VBox rootContainer = Main.root.getRootCenter();

        RecipeCreator creator = new RecipeCreator(10);
        creator.getContainer().getChildren().add(new IngredientHBox(10));
        rootContainer.getChildren().add(creator);

        creator.getButton1().setOnAction(e -> {
            creator.getContainer().getChildren().add(new IngredientHBox(10));
        
        });

        creator.getButton2().setOnAction(e -> {       

            String recipe = creator.getRecipeName().getText();
            int portions = Integer.parseInt(creator.getPortions().getText());
            int ingredientAmount = 0;
            String instructions = creator.getInstructions().getText();

            for (Node node : creator.getContainer().getChildren()) {
                if (node instanceof IngredientHBox) {
                    IngredientHBox ingredientBox = (IngredientHBox) node;

                    String ingredient = ingredientBox.getIngredient().getText();
                    String quantity = ingredientBox.getQuantity().getText();
                    String unit = ingredientBox.getUnit().getValue();
                    
                    String sum = ingredient + " " + quantity + " " + unit;
                
                    ingredientAmount++;
                    ingredients.add(sum);
                }
            }

            if(!recipe.isEmpty() && portions != 0 && ingredientAmount != 0 && !ingredients.isEmpty()){
                Recipe newRecipe = new Recipe(recipe, portions, ingredientAmount, ingredients, instructions);
                recipeList.add(newRecipe);

                ingredients.clear();
                status.setText("Recipe created successfully!");

                rootContainer.getChildren().remove(creator);
            }
            else{
                status.setText("Recipe cant be created!");
            }

        });




    }

}

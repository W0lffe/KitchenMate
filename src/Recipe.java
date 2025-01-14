import java.util.ArrayList;
import javafx.scene.Node;
import javafx.scene.layout.VBox;
import javafx.scene.control.TextField;

public class Recipe {
    
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
        return "Recipe [name=" + name + ", portions=" + portions + ", ingredientAmount=" + ingredientAmount
                + ", ingredients=" + ingredients + ", instructions=" + instructions + "]";
    }

    
    public static void createRecipe(){

        TextField status = Interface.getStatusField();
        ArrayList<String> ingredients = new ArrayList<String>();
        
        VBox rootContainer = Main.root.getRootCenter();
        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }

        RecipeCreator creator = new RecipeCreator(10);
        creator.getContainer().getChildren().add(new IngredientHBox(10));
        rootContainer.getChildren().add(creator);

        creator.getButton1().setOnAction(e -> {
            creator.getContainer().getChildren().add(new IngredientHBox(10));
        
        });

        creator.getButton2().setOnAction(e -> {       
            
            String recipe;
            int portions;

            try {
                recipe = creator.getRecipeName().getText();
                if (recipe.isEmpty()) {
                    status.setText("Recipe needs a name!");
                    return;
                }
                
                portions = Integer.parseInt(creator.getPortions().getText());
                if (portions <= 0) {
                    status.setText("Set portions quantity!");
                    return;
                }

            } catch (NumberFormatException error) {
                status.setText("Invalid number for portions!");
                return;
            }

            int ingredientAmount = 0;
            String instructions = creator.getInstructions().getText();

            if (instructions == null || instructions.isEmpty()) {
                instructions = "Instructions not specified!";
            }

            for (Node node : creator.getContainer().getChildren()) {
                if (node instanceof IngredientHBox) {
                    IngredientHBox ingredientBox = (IngredientHBox) node;

                    String ingredient;
                    String quantity;
                    String unit;

                    try {
                        ingredient = ingredientBox.getIngredient().getText();
                        if (ingredient.isEmpty()) {
                            status.setText("Please set name for ingredient!");
                            return;
                        }

                        quantity = ingredientBox.getQuantity().getText();
                        if (quantity.isEmpty()) {
                            status.setText("Please set value for ingredient quantity!");
                            return;
                        }

                        unit = ingredientBox.getUnit().getValue();
                        if (unit == null || unit.isEmpty()) {
                            status.setText("Please select unit value!");
                            return;
                        }
                    } catch (Exception error) {
                        status.setText("");
                        return;
                    }
                    
                    String sum = ingredient + " " + quantity + " " + unit;
                
                    ingredientAmount++;
                    ingredients.add(sum);
                }
            }

                if(!recipe.isEmpty() && !ingredients.isEmpty()){
                    Recipe newRecipe = new Recipe(recipe, portions, ingredientAmount, ingredients, instructions);
                    
                    String message = HTTP.saveRecipe(newRecipe);
                    ingredients.clear();
                    status.setText(message);
    
                    rootContainer.getChildren().remove(creator);
                }
                else{
                    status.setText("Recipe cant be created!");
                }
        
        });

    }
}

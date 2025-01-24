import java.util.ArrayList;
import javafx.scene.Node;
import javafx.scene.layout.VBox;

public class Recipe {
    
    private String name;
    private int portions;
    private int ingredientAmount;
    private ArrayList<Product> ingredients;
    private String instructions;
    private int id;
    
    public Recipe(String name, int portions, int ingredientAmount, ArrayList<Product> ingredients, String instructions) {
        this.name = name;
        this.portions = portions;
        this.ingredientAmount = ingredientAmount;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public int getId() {
        return id;
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

    public ArrayList<Product> getIngredients() {
        return ingredients;
    }

    public void setIngredients(ArrayList<Product> ingredients) {
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

        ArrayList<Product> ingredients = new ArrayList<Product>();
        
        VBox rootContainer = Main.root.getRootCenter();
        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }

        RecipeCreator creator = new RecipeCreator(10);
        creator.getContainer().getChildren().add(new IngredientHBox(10, creator));
        rootContainer.getChildren().add(creator);

        creator.getButton1().setOnAction(e -> {
            creator.getContainer().getChildren().add(new IngredientHBox(10, creator.getContainer()));
        });

        creator.getButton2().setOnAction(e -> {       
            
            String recipe;
            int portions;

            try {
                recipe = creator.getRecipeName().getText();
                if (recipe.isEmpty()) {
                    Modal.initInfoModal("Recipe needs a name!");
                    return;
                }
                
                portions = Integer.parseInt(creator.getPortions().getText());
                if (portions <= 0) {
                    Modal.initInfoModal("Set portions quantity!");
                    return;
                }

            } catch (NumberFormatException error) {
                Modal.initInfoModal("Invalid number for portions!");
                return;
            }

            String instructions = creator.getInstructions().getText();

            if (instructions == null || instructions.isEmpty()) {
                instructions = "Instructions not specified!";
            }

            for (Node node : creator.getContainer().getChildren()) {
                if (node instanceof IngredientHBox) {
                    IngredientHBox ingredientBox = (IngredientHBox) node;
                    Product collectedIng = collectIngredients(ingredientBox);
                    if(collectedIng == null){
                        return;
                    }
                    else{
                        ingredients.add(collectedIng);
                    }
                }
            }
 
                if(!recipe.isEmpty() && !ingredients.isEmpty()){
                    Recipe newRecipe = new Recipe(recipe, portions, ingredients.size(), ingredients, instructions);
                    
                    String message = HTTP.saveRecipe(newRecipe, "recipes");
                    ingredients.clear();
                    Modal.initInfoModal(message);
    
                    rootContainer.getChildren().remove(creator);
                }
                else{
                    Modal.initInfoModal("Recipe cant be created!");
                }
        
        });
    }


    public static Product collectIngredients(IngredientHBox container){

        String ingredient;
        String quantityString;
        String unit;
        double quantity;

        try {
            ingredient = container.getIngredient().getText();
            if (ingredient.isEmpty()) {
                Modal.initInfoModal("Please set name for ingredient!");
                return null;
            }

            quantityString = container.getQuantity().getText();
            if (quantityString.isEmpty()) {
                Modal.initInfoModal("Please set value for ingredient quantity!");
                return null;
            }
            else{
                quantity = Double.parseDouble(quantityString);
            }

            unit = container.getUnit().getValue();
            if (unit == null || unit.isEmpty()) {
                Modal.initInfoModal("Please select unit value!");
                return null;
            }
        } catch (Exception error) {
            Modal.initInfoModal("Error occured!");
            return null;
        }
        
        
        return new Product(ingredient, quantity, unit);
    }

}

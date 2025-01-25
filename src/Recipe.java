import java.util.ArrayList;
import javafx.scene.Node;
import javafx.scene.layout.VBox;

public class Recipe {
    
    private String recipeName;
    private int portions;
    private int ingredientAmount;
    private ArrayList<Product> ingredients;
    private ArrayList<String> instructions;
    private int id;

    public Recipe(String recipeName, int portions, int ingredientAmount, ArrayList<Product> ingredients, ArrayList<String> instructions) {
        this.recipeName = recipeName;
        this.portions = portions;
        this.ingredientAmount = ingredientAmount;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
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

    public ArrayList<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(ArrayList<String> instructions) {
        this.instructions = instructions;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public static void initRecipeCreation(){

        VBox mainRootRight =  Main.getRoot().getRootRightContainer();
        Main.clearRootRight();
        
        RecipeCreator creator = new RecipeCreator(10);
 
        mainRootRight.getChildren().add(creator);

        creator.getSaveButton().setOnAction(event -> {
            createRecipe(creator);
        });

    }

    private static void createRecipe(RecipeCreator creator){

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
        
            ArrayList<String> instructions = InstructionHBox.getInstructions(creator.getInstructionContainer());
           
            if(instructions.isEmpty()){
                instructions.add("Instructions not specified!");
            }

            ArrayList<Product> ingredients = new ArrayList<>();

            for (Node node : creator.getProductContainer().getChildren()) {
                if (node instanceof ProductHBox) {
                    ProductHBox ingredientBox = (ProductHBox) node;
                    Product collectedIngredient = ProductHBox.collectProducts(ingredientBox);
                    if(collectedIngredient == null){
                        return;
                    }
                    else{
                        ingredients.add(collectedIngredient);
                    }
                }
            }

            if(!recipe.isEmpty() || !ingredients.isEmpty()){

                Recipe newRecipe = new Recipe(recipe, portions, ingredients.size(), ingredients, instructions);
                HTTP.saveRecipe(newRecipe, "recipes");
                ingredients.clear();
                Recipe.initRecipeCreation();
            }
            else{
                Modal.initInfoModal("Recipe cant be created!");
            }


    }


}

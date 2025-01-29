import java.util.ArrayList;
import javafx.scene.Node;
import javafx.scene.layout.VBox;

public class Recipe {
    
    private String recipeName;
    private int portions;
    private int ingredientAmount;
    private ArrayList<Product> ingredients;
    private ArrayList<String> instructions;
    private boolean lockRecipe;
    private int id;

    public Recipe(String recipeName, int portions, int ingredientAmount, ArrayList<Product> ingredients, ArrayList<String> instructions, boolean lockRecipe) {
        this.recipeName = recipeName;
        this.portions = portions;
        this.ingredientAmount = ingredientAmount;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.lockRecipe = lockRecipe;
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

    
    public boolean isLockRecipe() {
        return lockRecipe;
    }

    public void setLockRecipe(boolean lockRecipe) {
        this.lockRecipe = lockRecipe;
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

            boolean lock = creator.getAllowDelete().isSelected();

            if(!recipe.isEmpty() || !ingredients.isEmpty()){

                Recipe newRecipe = new Recipe(recipe, portions, ingredients.size(), ingredients, instructions, lock);
                HTTP.saveData(newRecipe, "Recipe");
                ingredients.clear();
                Recipe.initRecipeCreation();
            }
            else{
                Modal.initInfoModal("Recipe cant be created!");
            }


    }


}

import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.control.ScrollPane;
import javafx.scene.Node;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;

public class RecipeDetails extends HBox{
    
    private VBox ingredientsBox;
    private ScrollPane ingredientScroll;
    private VBox instructionBox;
    private ScrollPane instructionScroll;
    private VBox buttonBox;
    private Button editButton;
    private Button deleteButton;
    
    public RecipeDetails(double spacing) {
        super(spacing);
        this.ingredientsBox = new VBox(15);
        this.ingredientScroll = new ScrollPane(ingredientsBox);
        this.ingredientScroll.setFitToWidth(true);
        
        this.instructionBox = new VBox(15);
        this.instructionScroll = new ScrollPane(instructionBox);
        this.instructionScroll.setFitToWidth(true);
        
        this.editButton = new Button("EDIT");
        this.deleteButton = new Button("DELETE");
        this.buttonBox = new VBox(10, editButton, deleteButton);

        this.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.95);
        this.setMaxHeight(Main.getRoot().getRootRightContainer().getHeight()*0.9);
        this.ingredientsBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.4);
        this.ingredientsBox.setMaxHeight(Main.getRoot().getRootRightContainer().getHeight()*0.7);
        this.ingredientsBox.setAlignment(Pos.TOP_CENTER);
       
        this.instructionBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.4);
        this.instructionBox.setMaxHeight(Main.getRoot().getRootRightContainer().getHeight()*0.7);
        this.instructionBox.setAlignment(Pos.TOP_CENTER);
        
        this.buttonBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.15);
        this.buttonBox.setAlignment(Pos.TOP_CENTER);

        this.getChildren().addAll(ingredientScroll, instructionScroll, buttonBox);

        
    }

    public void addDetails(Recipe recipe){
        Label ingredients = new Label("Ingredients:");
        ingredients.setUnderline(true);

        Label instructions = new Label("Instructions:");
        instructions.setUnderline(true);

        this.ingredientsBox.getChildren().add(ingredients);
        this.instructionBox.getChildren().add(instructions);

        for (Product product : recipe.getIngredients()) {
            Label ingredient = new Label(product.toString());
            ingredient.setWrapText(true);
            this.ingredientsBox.getChildren().add(ingredient);
        }

        for (String step : recipe.getInstructions()) {
            Label instruction = new Label(step);
            instruction.setWrapText(true);
            this.instructionBox.getChildren().add(instruction);
        }

        this.editButton.setOnAction(e -> {
            this.editDetails(recipe, ingredients, instructions);
        });

        this.deleteButton.setOnAction(e -> {
            if(recipe.isLockRecipe()){
                Modal.initInfoModal("Recipe is locked!");
            }
            else{
                HTTP.deleteData(recipe.getId());
                RecipeList.initRecipeList();
            }
        });
    }

    public void editDetails(Recipe recipe, Label ing, Label ins){

        this.ingredientsBox.getChildren().clear();
        this.instructionBox.getChildren().clear();
        this.ingredientsBox.getChildren().add(ing);
        this.instructionBox.getChildren().add(ins);
        
        this.editButton.setText("FINISH");
        this.deleteButton.setText("ADD INGREDIENT");
        Button addStep = new Button("ADD STEP");
        CheckBox allowDelete = new CheckBox("LOCK RECIPE");
        this.buttonBox.getChildren().addAll(addStep, allowDelete);
        
        for (Product product : recipe.getIngredients()) {
            
            ProductHBox productToEdit = new ProductHBox(5, this.ingredientsBox);
            productToEdit.getProduct().setText(product.getName());
            productToEdit.getQuantity().setText(Double.toString(product.getQuantity()));
            productToEdit.getUnit().setValue(product.getUnit());

            this.ingredientsBox.getChildren().add(productToEdit);
        }

        for (String step : recipe.getInstructions()) {
            
            InstructionHBox instructionToEdit = new InstructionHBox(15, "", this.instructionBox);
            instructionToEdit.getStepText().setText(step);

            this.instructionBox.getChildren().add(instructionToEdit);

        }

        allowDelete.setSelected(recipe.isLockRecipe());

        this.editButton.setOnAction(e ->  {

            recipe.getIngredients().clear();
            recipe.getInstructions().clear();

            for (Node node : this.ingredientsBox.getChildren()) {
                if (node instanceof ProductHBox) {
                    ProductHBox temp = (ProductHBox) node;
                    Product collectedProduct = ProductHBox.collectProducts(temp);
                    recipe.getIngredients().add(collectedProduct);
                }
            }

            recipe.setInstructions(InstructionHBox.getInstructions(this.instructionBox));
            recipe.setIngredientAmount(recipe.getIngredients().size());
            recipe.setLockRecipe(allowDelete.isSelected());

            HTTP.saveData(recipe, "Recipe");
            RecipeList.initRecipeList();
        });

        this.deleteButton.setOnAction(e -> {
            this.ingredientsBox.getChildren().add(new ProductHBox(10, this.ingredientsBox));
        });

        addStep.setOnAction(e -> {
            this.instructionBox.getChildren().add(new InstructionHBox(10, "", this.instructionBox));
        });



    }

    

    
}

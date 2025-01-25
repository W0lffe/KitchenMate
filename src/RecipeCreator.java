import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.Node;

public class RecipeCreator extends VBox {
    
    private Label title;
    private Label nameText;
    private Label portText;
    private TextField recipeName;
    private TextField portions;
    private HBox textFieldContainer;
    private VBox productContainer;
    private ScrollPane productScroll;
    private VBox instructionContainer;
    private ScrollPane instructionScroll;
    private HBox scrollContainer;
    private Button addIngredientButton;
    private Button addStepButton;
    private Button saveButton;
    private HBox buttonBar;
   
    public RecipeCreator(double spacing) {
        super(spacing);
        this.title = new Label("CREATE A NEW RECIPE");
        this.title.setPadding(new Insets(10));

        this.recipeName = new TextField();
        this.nameText = new Label("Enter name for recipe: ");
        this.portions = new TextField();
        this.portText = new Label("Enter amount of portions: ");
        this.textFieldContainer = new HBox(20, nameText, recipeName, portText, portions);
        
        this.productContainer = new VBox(20);
        this.productContainer.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.45);
        this.productScroll = new ScrollPane(productContainer);
        this.productScroll.setFitToWidth(true);
        
        this.instructionContainer = new VBox(20);
        this.instructionContainer.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.45);
        this.instructionScroll = new ScrollPane(instructionContainer);
        this.instructionScroll.setFitToWidth(true);

        this.scrollContainer = new HBox(20, productScroll, instructionScroll);
        this.scrollContainer.setAlignment(Pos.CENTER);

        this.addIngredientButton = new Button("ADD INGREDIENT");
        this.addStepButton = new Button("ADD STEP TO INSTRUCTIONS");
        this.saveButton = new Button("SAVE RECIPE");
        this.buttonBar = new HBox(20, addIngredientButton, addStepButton, saveButton);

        this.setAlignment(Pos.TOP_CENTER);
        this.setPrefSize(Main.getRoot().getRootRightContainer().getWidth(), Main.getRoot().getRootRightContainer().getHeight());
        this.textFieldContainer.setPrefHeight(Main.getRoot().getRootRightContainer().getHeight()*0.1);
        this.scrollContainer.setPrefHeight(Main.getRoot().getRootRightContainer().getHeight()*0.6);

        ProductHBox firstIngredient = new ProductHBox(10, this.productContainer);
        this.productContainer.getChildren().add(firstIngredient);

        InstructionHBox firstStep = new InstructionHBox(10, "Step 1",  this.instructionContainer);
        this.instructionContainer.getChildren().add(firstStep);

        this.getChildren().addAll(title, textFieldContainer, scrollContainer, buttonBar);

        this.addIngredientButton.setOnAction(e -> {
            this.productContainer.getChildren().add(new ProductHBox(10, this.productContainer));
        });

        this.addStepButton.setOnAction(e -> {
            String step = this.getStepCount();
            this.instructionContainer.getChildren().add(new InstructionHBox(10, step, this.instructionContainer));
        });

    }

    private String getStepCount(){
        int count = 1;
        
        for (Node node : this.instructionContainer.getChildren()) {
            if(node instanceof InstructionHBox){
                count++;
            }
        }

        return "Step " + Integer.toString(count);
    }

    public Button getSaveButton(){
        return saveButton;
    }

    public TextField getRecipeName(){
        return recipeName;
    }

    public TextField getPortions() {
        return portions;
    }

    public VBox getInstructionContainer() {
        return instructionContainer;
    }

    public VBox getProductContainer() {
        return productContainer;
    }
    
    
    
}


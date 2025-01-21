import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.ScrollPane;
import javafx.scene.Node;

public class RecipeCreator extends VBox {
    
    private Label title;
    private TextField recipeName;
    private TextField portions;
    private ScrollPane scrollpane;
    private VBox container;
    private Button button1;
    private TextArea instructions;
    private Button button2;
    
    public RecipeCreator(double spacing) {
        super(spacing);
        this.title = new Label("CREATE A NEW RECIPE");
        this.recipeName = new TextField();
        this.portions = new TextField();
        this.scrollpane = new ScrollPane();
        this.button1 = new Button("ADD NEW INGREDIENT");
        this.instructions = new TextArea();
        this.button2 = new Button("SAVE RECIPE");

        container = new VBox(10);
        container.setAlignment(Pos.TOP_CENTER);
        scrollpane.setFitToWidth(true);
        scrollpane.setMaxSize(Main.getRoot().getRootCenter().getWidth()*0.5, Main.getRoot().getRootCenter().getHeight()*0.4);
        scrollpane.setContent(container);

        this.instructions.setMaxSize(300, 100);

        this.recipeName.setPromptText("Enter recipe name");
        this.recipeName.setMaxWidth(Main.getRoot().getRootCenter().getWidth()*0.33);
        this.portions.setPromptText("How many portions?");
        this.portions.setMaxWidth(Main.getRoot().getRootCenter().getWidth()*0.33);
        instructions.setPromptText("Write instructions here");
        this.instructions.setMaxSize(Main.getRoot().getRootCenter().getWidth()*0.3, 200);

        this.getChildren().addAll(title,recipeName,portions, scrollpane, button1, instructions, button2);
        this.setMaxSize(Main.getRoot().getRootCenter().getWidth()*0.75, Main.getRoot().getRootCenter().getHeight());
    }

    public Label getTitle() {
        return title;
    }

    public VBox getContainer() {
        return container;
    }

    public Button getButton1() {
        return button1;
    }

    public TextArea getInstructions() {
        return instructions;
    }

    public Button getButton2() {
        return button2;
    }

    public TextField getRecipeName() {
        return recipeName;
    }

    public TextField getPortions() {
        return portions;
    }
 
}

class IngredientHBox extends HBox{

    private TextField ingredient;
    private TextField quantity;
    private ChoiceBox<String> unit;
    private Button remove;
    
    public IngredientHBox(double spacing, VBox parent) {
        super(spacing);
        this.ingredient = new TextField();
        this.quantity = new TextField();
        this.unit = new ChoiceBox<String>();
        this.remove = new Button("Remove");
        
        unit.getItems().addAll("kg", "g", "litre", "dl");
        ingredient.setPromptText("Ingredient");
        quantity.setPromptText("Quantity");

        this.unit.setPrefSize(50, 10); 

        this.remove.setOnAction(e -> {
            int parentChildrens = 0;
            for (Node node : parent.getChildren()) {
                if (node instanceof IngredientHBox) {
                    parentChildrens++;
                }
            }
            if (parentChildrens > 1) {
                parent.getChildren().remove(this);
            }
            else{
                //Interface.getStatusField().setText("You must have atleast two ingredients!");
            }
        });

        this.getChildren().addAll(ingredient, quantity, unit, remove);
    }

    public TextField getIngredient() {
        return ingredient;
    }

    public TextField getQuantity() {
        return quantity;
    }

    public ChoiceBox<String> getUnit() {
        return unit;
    }
    
}

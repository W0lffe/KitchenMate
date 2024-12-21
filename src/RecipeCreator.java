import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;

public class RecipeCreator extends VBox {
    
    private Label title;
    private VBox container;
    private Button button1;
    private TextArea textArea;
    private Button button2;
    
    public RecipeCreator(double arg0, Label title, VBox container, IngredientHBox firstIngredient, Button button1,
            TextArea textArea, Button button2) {
        super(arg0);
        this.title = new Label("Create a new recipe");
        this.container = new VBox(10);
        this.button1 = new Button("Add ingredient");
        this.textArea = new TextArea();
        this.button2 = new Button("Save recipe");

        this.getChildren().addAll(title, container, button1, textArea, button2);
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

    public TextArea getTextArea() {
        return textArea;
    }

    public Button getButton2() {
        return button2;
    }

}

class IngredientHBox extends HBox{

    private TextField ingredient;
    private TextField quantity;
    
    public IngredientHBox(double spacing) {
        super(spacing);
        this.ingredient = new TextField();
        this.quantity = new TextField();

        this.getChildren().addAll(ingredient, quantity);
    }

    public TextField getIngredient() {
        return ingredient;
    }

    public TextField getQuantity() {
        return quantity;
    }
}

import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class ProductHBox extends HBox{

    private TextField product;
    private TextField quantity;
    private ChoiceBox<String> unit;
    private Button button;
    
    public ProductHBox(double spacing, VBox parent) {
        super(spacing);
        this.product = new TextField();
        this.quantity = new TextField();
        this.unit = new ChoiceBox<String>();
        this.button = new Button("Remove");
        
        unit.getItems().addAll("kg", "g", "litre", "dl", "pcs");
        product.setPromptText("Ingredient");
        quantity.setPromptText("Quantity");

        this.unit.setPrefSize(50, 10); 
        this.quantity.setPrefSize(100, 10);

        unit.getStyleClass().add("choice-box"); 

        this.button.setOnAction(e -> {
            int parentChildrens = 0;
            for (Node node : parent.getChildren()) {
                if (node instanceof ProductHBox) {
                    parentChildrens++;
                }
            }
            if (parentChildrens > 1) {
                parent.getChildren().remove(this);
            }
            else{
                Modal.initInfoModal("You must have atleast one ingredient!");
            }
        });

        this.getChildren().addAll(product, quantity, unit, button);
        this.getStyleClass().add("producthbox");
    }

    public ProductHBox(double spacing) {
        super(spacing);
        this.product = new TextField();
        this.quantity = new TextField();
        this.unit = new ChoiceBox<String>();
        this.button = new Button("Remove");
        
        unit.getItems().addAll("kg", "g", "litre", "dl", "pcs");
        product.setPromptText("Product");
        quantity.setPromptText("Quantity");


        unit.getStyleClass().add("choice-box"); 
        this.unit.setPrefSize(50, 10); 
        this.quantity.setPrefSize(100, 10);

        this.getChildren().addAll(product, quantity, unit, button);
    }

    public TextField getProduct() {
        return product;
    }

    public TextField getQuantity() {
        return quantity;
    }

    public ChoiceBox<String> getUnit() {
        return unit;
    }

    public Button getButton() {
        return button;
    }

    public static Product collectProducts(ProductHBox container){

        String ingredient;
        String quantityString;
        String unit;
        double quantity;

        try {
            ingredient = container.getProduct().getText();
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
    


import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class RecipeContainer extends VBox{
    
    private HBox boxContainer;
    private VBox recipeNameBox;
    private VBox portionsBox;
    private VBox ingredientAmountBox;
    private HBox buttonsBox;
    private Button showDetails;
    private Button addToBasket;
    
    public RecipeContainer(String recipeName, String portions, String ingredients) {
        super(15);
        this.boxContainer = new HBox(10);
        this.recipeNameBox = new VBox(10, new Label("Recipe: " + recipeName));
        this.portionsBox = new VBox(10, new Label("Portions: " + portions));
        this.ingredientAmountBox = new VBox(10, new Label("Ingredients: " + ingredients));
        this.showDetails = new Button("SHOW DETAILS");
        this.addToBasket = new Button("ADD");
        this.buttonsBox = new HBox(10, showDetails, addToBasket);

        this.recipeNameBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.3);
        this.recipeNameBox.setAlignment(Pos.CENTER);
        
        this.portionsBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.12);
        this.portionsBox.setAlignment(Pos.CENTER);

        this.ingredientAmountBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.12);
        this.ingredientAmountBox.setAlignment(Pos.CENTER);

        this.buttonsBox.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.3);
        this.buttonsBox.setAlignment(Pos.CENTER);

        this.boxContainer.getChildren().addAll(recipeNameBox, portionsBox, ingredientAmountBox, buttonsBox);
        this.getChildren().add(boxContainer);
        this.getStyleClass().add("recipecontainer");

    }

    public Button getShowDetails() {
        return showDetails;
    }

    public Button getAddButton() {
        return addToBasket;
    }

    
}

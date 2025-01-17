import javafx.scene.layout.VBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.layout.HBox;

public class ShoppingList {
    
    public static void showShoppingList(){

        VBox rootContainer = Main.getRoot().getRootCenter();
      
        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }

        ScrollPane scrollContainer = new ScrollPane();
        scrollContainer.setFitToWidth(true);

        VBox container = new VBox(10);
        scrollContainer.setContent(container);


        for (Ingredient ing : RecipeList.getList()) {
            IngShop ingContainer = new IngShop(10, ing.getName(), Double.toString(ing.getQuantity()), ing.getUnit());
            container.getChildren().add(ingContainer);
        }

        rootContainer.getChildren().add(scrollContainer);
    }
}

class IngShop extends HBox{

    private Label name;
    private Label quantity;
    private Label unit;
    
    public IngShop(double spacing, String ingName, String ingQuantity, String ingUnit) {
        super(spacing);
        this.name = new Label(ingName);
        this.quantity = new Label(ingQuantity);
        this.unit = new Label(ingUnit);

        this.getChildren().addAll(name, quantity, unit);
    }
    
    
}

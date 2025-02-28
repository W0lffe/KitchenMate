import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.control.Label;

/**@class Navigation
 * @purpose holds UI elements for navigation bar, extends VBox
 */
public class Navigation extends VBox {
    
    //Elements
    private VBox button1;
    private VBox button2;
    private VBox button3;
    
    //Constructors

    public Navigation(double spacing) {
        super(spacing);
        this.button1 = new VBox(10, new Label("RECIPE CREATION"));
        this.button2 = new VBox(10, new Label("RECIPE LIST"));
        this.button3 = new VBox(10, new Label("BASKET"));

        this.button1.setPrefSize(Main.getWidth()*0.2, Main.getHeight()*0.05);
        this.button2.setPrefSize(Main.getWidth()*0.2, Main.getHeight()*0.05);
        this.button3.setPrefSize(Main.getWidth()*0.2, Main.getHeight()*0.05);
        this.button1.setAlignment(Pos.TOP_CENTER);
        this.button2.setAlignment(Pos.TOP_CENTER);
        this.button3.setAlignment(Pos.TOP_CENTER);

        this.button1.getStyleClass().add("vboxbutton");
        this.button2.getStyleClass().add("vboxbutton");
        this.button3.getStyleClass().add("vboxbutton");

        this.getChildren().addAll(button1, button2, button3);

        this.button1.setOnMouseClicked(e -> {
            Recipe.initRecipeCreation();
        });

        this.button2.setOnMouseClicked(e -> {
            RecipeList.initRecipeList();
        });

        this.button3.setOnMouseClicked(e -> {
            ShoppingList.initShoppingList();
        });
    }
    
    
    public VBox getButton1() {
        return button1;
    }

    public VBox getButton2() {
        return button2;
    }

    public VBox getButton3() {
        return button3;
    }

    

   
    
 
}


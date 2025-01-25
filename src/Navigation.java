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

    public Navigation(double spacing, VBox parent) {
        super(spacing);
        this.button1 = new VBox(10, new Label("RECIPE CREATION"));
        this.button2 = new VBox(10, new Label("RECIPE LIST"));
        this.button3 = new VBox(10, new Label("BASKET"));

        this.button1.setPrefSize(parent.getWidth(), parent.getHeight()*0.1);
        this.button2.setPrefSize(parent.getWidth(), parent.getHeight()*0.1);
        this.button3.setPrefSize(parent.getWidth(), parent.getHeight()*0.1);
        this.button1.setAlignment(Pos.TOP_CENTER);
        this.button2.setAlignment(Pos.TOP_CENTER);
        this.button3.setAlignment(Pos.TOP_CENTER);

        this.getChildren().addAll(button1, button2, button3);

        this.button1.setOnMouseClicked(e -> {
            Recipe.initRecipeCreation();
        });

        this.button2.setOnMouseClicked(e -> {
            RecipeList.initRecipeList();
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


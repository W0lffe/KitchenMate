import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;

/**@class Interface
 * @purpose holds all the elements required for Root
 */
public class Interface extends BorderPane {

    //Elements
    private VBox top;
    private VBox bottom;
    private VBox left;
    private VBox right;
    private VBox center;

    //Constructor
    public Interface(VBox top, VBox bottom, VBox left, VBox right, VBox center) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.center = center;

        this.setCenter(center);
        this.setTop(top);
        this.setLeft(left);
        this.setRight(right);
        this.setBottom(bottom);

        this.getStyleClass().add("root");
        top.getStyleClass().add("vbox");
        bottom.getStyleClass().add("vbox");
        left.getStyleClass().add("vbox");
        right.getStyleClass().add("vbox");
        center.getStyleClass().add("vbox");
    }


    /**
     * @return top of root borderpane
     */
    public VBox getRootTop() {
        return top;
    }

    /**
     * @return bottom of root borderpane
     */
    public VBox getRootBottom() {
        return bottom;
    }

      /**
     * @return left of root borderpane
     */
    public VBox getRootLeft() {
        return left;
    }

      /**
     * @return right of root borderpane
     */
    public VBox getRootRight() {
        return right;
    }

      /**
     * @return center of root borderpane
     */
    public VBox getRootCenter() {
        return center;
    }

    /**
     * @function init()
     * @brief creates root for window based on Interface class
     * @return root for window (interface class)
     */
    public static Interface init(){

        //Create navigation bar
        VBox top = new VBox(10);
        Navigation naviBar = new Navigation(20, "CREATE A RECIPE", "BROWSE RECIPES", "SHOPPING LIST");
        naviBar.getButton1().setOnAction(event -> Recipe.createRecipe());
        naviBar.getButton2().setOnAction(event -> RecipeList.showRecipes());
        naviBar.getButton3().setOnAction(event -> ShoppingList.showShoppingList());
        naviBar.setAlignment(Pos.CENTER);
        top.setAlignment(Pos.TOP_CENTER);
        top.getChildren().addAll(new Label("Navigation"), naviBar);
        top.setMaxSize(Main.WIDTH, Main.HEIGHT*0.10);

        //Create left container
        VBox left = new VBox();
        left.setPrefSize(Main.WIDTH*0.05, Main.HEIGHT*0.60);
        left.setAlignment(Pos.CENTER);

        //Create right container
        VBox right = new VBox();
        right.setPrefSize(Main.WIDTH*0.05, Main.HEIGHT*0.60);
        right.setAlignment(Pos.CENTER);

        //Create bottom container
        VBox bottom = new VBox();
        bottom.setMaxSize(Main.WIDTH, Main.HEIGHT*0.10);
        bottom.setAlignment(Pos.CENTER);

        //Create center container
        VBox center = new VBox(20);
        center.setPrefSize(Main.WIDTH - left.getWidth(), Main.HEIGHT*0.60);
        center.setAlignment(Pos.TOP_CENTER);

        //Create Interface class ROOT for window with previously created containers
        Interface root = new Interface(top, bottom, left, right, center);
        root.getStylesheets().add(Interface.class.getResource("styles.css").toExternalForm()); //add stylesheet

        //Return root to Main
        return root;
    }
    
}


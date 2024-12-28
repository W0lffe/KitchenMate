import javafx.geometry.Pos;
import javafx.scene.control.TextField;
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
    private static TextField status;


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
        Navigation naviBar = new Navigation(20, "Navigation", "CREATE A RECIPE", "BROWSE RECIPES", "CREATE A SHOPPING LIST");
        naviBar.getButton1().setOnAction(event -> Recipe.createRecipe());
        naviBar.getButton2().setOnAction(event -> RecipeList.showRecipes());
        naviBar.setAlignment(Pos.TOP_CENTER);

        //Create left container
        VBox left = new VBox();
        left.setPrefSize(Main.WIDTH/6, 400);
        left.setAlignment(Pos.TOP_CENTER);
        left.getChildren().add(naviBar); //add navibar
        
        //Create textfield
        TextField statusField = new TextField();
        statusField.setMaxSize(Main.WIDTH/4, 20);
        statusField.setEditable(false);
        status = statusField;

        //Create top container
        VBox top = new VBox();
        top.setPrefSize(Main.WIDTH, Main.HEIGHT/6);
        top.setAlignment(Pos.CENTER);
        top.getChildren().addAll(statusField); //Add textfield

        //Create right container
        VBox right = new VBox();
        right.setPrefSize(Main.WIDTH/6, 400);
        right.setAlignment(Pos.CENTER);

        //Create bottom container
        VBox bottom = new VBox();
        bottom.setMaxSize(Main.WIDTH, Main.HEIGHT/10);
        bottom.setAlignment(Pos.CENTER);

        //Create center container
        VBox center = new VBox();
        center.setPrefSize(800, 500);
        center.setAlignment(Pos.TOP_CENTER);

        //Create Interface class ROOT for window with previously created containers
        Interface root = new Interface(top, bottom, left, right, center);
        root.getStylesheets().add(Interface.class.getResource("styles.css").toExternalForm()); //add stylesheet

        //Return root to Main
        return root;
    }

    /**
     * @return TextField element of top container
     */
    public static TextField getStatusField(){
        return status;
    }


    
}


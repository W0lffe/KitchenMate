import javafx.geometry.Pos;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;

public class Interface extends BorderPane {

    private VBox top;
    private VBox bottom;
    private VBox left;
    private VBox right;
    private VBox center;
    
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

    public VBox getRootTop() {
        return top;
    }

    public VBox getRootBottom() {
        return bottom;
    }

    public VBox getRootLeft() {
        return left;
    }

    public VBox getRootRight() {
        return right;
    }

    public VBox getRootCenter() {
        return center;
    }

    public static Interface init(){

        Navigation naviBar = new Navigation(20, "Navigation", "CREATE A RECIPE", "BROWSE RECIPES", "CREATE A SHOPPING LIST");
    
        naviBar.getButton1().setOnAction(event -> Recipe.createRecipe());
        naviBar.getButton2().setOnAction(event -> RecipeList.showRecipes());

        VBox left = new VBox();
        left.setPrefSize(Main.WIDTH/6, 400);
        left.setAlignment(Pos.CENTER);
        left.getChildren().add(naviBar);
    
        VBox top = new VBox();
        top.setPrefSize(Main.WIDTH, Main.HEIGHT/6);
        top.setAlignment(Pos.CENTER);

        VBox right = new VBox();
        right.setPrefSize(Main.WIDTH/6, 400);
        right.setAlignment(Pos.CENTER);

        VBox bottom = new VBox();
        bottom.setPrefSize(Main.WIDTH, Main.HEIGHT/6);
        bottom.setAlignment(Pos.CENTER);

        VBox center = new VBox();
        naviBar.setPrefSize(800, 400);
        center.setAlignment(Pos.TOP_CENTER);

        Interface root = new Interface(top, bottom, left, right, center);
        root.getStylesheets().add(Interface.class.getResource("styles.css").toExternalForm());

        return root;
    }
    
}


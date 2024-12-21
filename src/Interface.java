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

        Navigation naviBar = new Navigation(10, "Navigation", "Create a Recipe", "Browse Recipes", "Create a shopping list");
        naviBar.setPrefSize(Main.WIDTH/4, Main.HEIGHT/2);

        VBox top = new VBox();
        top.setPrefSize(Main.WIDTH/2, Main.HEIGHT/6);

        VBox right = new VBox();
        right.setPrefSize(Main.WIDTH/4, Main.HEIGHT/2);

        VBox bottom = new VBox();
        bottom.setPrefSize(Main.WIDTH/2, Main.HEIGHT/6);

        VBox center = new VBox();
        naviBar.setPrefSize(Main.WIDTH/2, Main.HEIGHT/6);

        Interface root = new Interface(top, bottom, naviBar, right, center);
        return root;
    }
    
}


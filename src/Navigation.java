import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

public class Navigation extends VBox {
    
    private Label naviLabel;
    private Button button1;
    private Button button2;
    private Button button3;

    
    public Navigation(double spacing, String naviLabelString, String buttonString) {
        super(spacing);
        this.naviLabel = new Label(naviLabelString);
        this.button1 = new Button(buttonString);

        this.getChildren().addAll(naviLabel, button1);
    }

    public Navigation(double spacing, String naviLabelString, String buttonString, String buttonString2) {
        super(spacing);
        this.naviLabel = new Label(naviLabelString);
        this.button1 = new Button(buttonString);
        this.button2 = new Button(buttonString2);

        this.getChildren().addAll(naviLabel, button1, button2);
    }

    public Navigation(double spacing, String naviLabelString, String buttonString, String buttonString2, String buttonString3) {
        super(spacing);
        this.naviLabel = new Label(naviLabelString);
        this.button1 = new Button(buttonString);
        this.button2 = new Button(buttonString2);
        this.button3 = new Button(buttonString3);

        this.getChildren().addAll(naviLabel, button1, button2, button3);

    }

    public Label getNaviLabel() {
        return naviLabel;
    }

    public Button getButton1() {
        return button1;
    }

    public Button getButton2() {
        return button2;
    }

    public Button getButton3() {
        return button3;
    }
 
}


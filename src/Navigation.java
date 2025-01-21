import javafx.scene.control.Button;
import javafx.scene.layout.HBox;

/**@class Navigation
 * @purpose holds UI elements for navigation bar, extends VBox
 */
public class Navigation extends HBox {
    
    //Elements
    private Button button1;
    private Button button2;
    private Button button3;

    //Constructors
    public Navigation(double spacing, String buttonString) {
        super(spacing);
        this.button1 = new Button(buttonString);

        this.getChildren().addAll(button1);
    }

    public Navigation(double spacing,String buttonString, String buttonString2) {
        super(spacing);
        this.button1 = new Button(buttonString);
        this.button2 = new Button(buttonString2);

        this.getChildren().addAll(button1, button2);
    }

    public Navigation(double spacing, String buttonString, String buttonString2, String buttonString3) {
        super(spacing);
        this.button1 = new Button(buttonString);
        this.button2 = new Button(buttonString2);
        this.button3 = new Button(buttonString3);

        this.getChildren().addAll(button1, button2, button3);

    }

    /**
     * @return first button of navigation bar
     */
    public Button getButton1() {
        return button1;
    }

     /**
     * @return second button of navigation bar
     */
    public Button getButton2() {
        return button2;
    }

     /**
     * @return third button of navigation bar
     */
    public Button getButton3() {
        return button3;
    }
 
}


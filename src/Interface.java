import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import javafx.scene.layout.HBox;

/**@class Interface
 * @purpose holds all the elements required for Root
 */
public class Interface extends HBox {

    //Elements
    private VBox rootLeftContainer;
    private VBox rootRightContainer;
   
    //Constructor
    public Interface() {
        this.rootLeftContainer = new VBox(10);
        this.rootRightContainer = new VBox(10);

        this.getStyleClass().add("root");
        rootLeftContainer.getStyleClass().add("vbox");
        rootRightContainer.getStyleClass().add("vbox");
        this.setPrefSize(Main.getWidth(), Main.getHeight());
        this.rootLeftContainer.setPrefSize(Main.getWidth()*0.2, Main.getHeight());
        this.rootRightContainer.setPrefSize(Main.getWidth()*0.8, Main.getHeight());
        this.rootLeftContainer.setAlignment(Pos.CENTER);
        this.rootRightContainer.setAlignment(Pos.CENTER);
        this.initNavi();
        this.getStylesheets().add(Interface.class.getResource("styles.css").toExternalForm());

        this.getChildren().addAll(rootLeftContainer, rootRightContainer);
    }

    public VBox getRootLeftContainer() {
        return rootLeftContainer;
    }

    public VBox getRootRightContainer() {
        return rootRightContainer;
    }

    public void initNavi(){
        Navigation newNavi = new Navigation(50, this.rootLeftContainer);
        this.rootLeftContainer.getChildren().add(newNavi);
    }

}


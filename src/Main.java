import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.awt.*;

public class Main extends Application{

    /**@description Reference to main menu scene created in Main */
    private static Scene main;

    /**@description Reference to primary stage created in Main*/
    private static Stage primaryStage;

    /**@description definitions for width of window */
    private static int WIDTH;
    /**@description definitions for height of window */
    private static int HEIGHT;

    /**@description Reference to root of Interface created in Main */
    private static Interface root;

     @Override
    public void start(Stage primary){

        //Init tools to to find users screensize
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension userScreenSize = toolkit.getScreenSize();

        WIDTH = userScreenSize.width / 2;
        HEIGHT = userScreenSize.height / 2;
        System.out.println(WIDTH);
        System.out.println(HEIGHT);

        primaryStage = primary;

        //Create scene for main menu
        root = new Interface();
        main = new Scene(root, WIDTH, HEIGHT);
        main.getStylesheets().add(getClass().getResource("styles.css").toExternalForm());
       
        //Set scene
        primaryStage.setTitle("KitchenMate");
        primaryStage.setScene(main);
        primaryStage.show();
    }

    public static void clearRootRight(){
        if(!getRoot().getRootRightContainer().getChildren().isEmpty()){
            getRoot().getRootRightContainer().getChildren().clear();
        }
    }

    public static Interface getRoot(){
        return root;
    }

    public static int getWidth(){
        return WIDTH;
    }

    public static int getHeight(){
        return HEIGHT;
    }

    public static void main(String[] args) {
        launch(args);
    }
}
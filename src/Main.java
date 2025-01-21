import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.awt.*;

public class Main extends Application{

    /**@description Reference to main menu scene created in Main */
    public static Scene main;

    /**@description Reference to primary stage created in Main*/
    public static Stage primaryStage;

    /**@description Final definitions for width of window */
    public static int WIDTH;
    /**@description Final definitions for height of window */
    public static int HEIGHT;

    /**@description Reference to root of Interface created in Main */
    public static Interface root;

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
        root = Interface.init();
        main = new Scene(root, WIDTH, HEIGHT);
       
        //Set scene
        primaryStage.setTitle("KitchenMate");
        primaryStage.setScene(main);
        primaryStage.show();

    }

    public static Interface getRoot(){
        return root;
    }
    public static void main(String[] args) {
        launch(args);
    }
}
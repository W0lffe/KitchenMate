import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application{

    /**@description Reference to main menu scene created in Main */
    public static Scene main;

    /**@description Reference to primary stage created in Main*/
    public static Stage primaryStage;

    /**@description Final definitions for width of window */
    public static final int WIDTH = 1200;
    /**@description Final definitions for height of window */
    public static final int HEIGHT = 600;

    /**@description Reference to root of Interface created in Main */
    public static Interface root;

     @Override
    public void start(Stage primary){
        
        primaryStage = primary;

        //Create scene for main menu
        root = Interface.init();
        main = new Scene(root, WIDTH, HEIGHT);
       
        //Set scene
        primaryStage.setTitle("KitchenMate");
        primaryStage.setScene(main);
        primaryStage.show();

    }
    public static void main(String[] args) {
        launch(args);
    }
}
import javafx.scene.layout.VBox;

import java.util.ArrayList;

import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.layout.HBox;

public class ShoppingList {
    
    private static ArrayList<Product> shoppingList = new ArrayList<>();

    public static void showShoppingList(){

        VBox rootContainer = Main.getRoot().getRootCenter();
      
        if(!rootContainer.getChildren().isEmpty()){
            rootContainer.getChildren().clear();
        }

        ShoppingListView shopList = new ShoppingListView(10);
        Label title = new Label("SHOPPING LIST");

        if(!shoppingList.isEmpty()){
            shopList.populateList();
        }

        rootContainer.getChildren().addAll(title, shopList);
    }

    public static void appendToShoppingList(Product toAppend){
        boolean productExists = false;

        for (Product product : shoppingList) {
            if(product.getName().equals(toAppend.getName())){
                double sum = product.getQuantity() + toAppend.getQuantity();
                product.setQuantity(sum);
                productExists = true;
                break;
            }
        }

        if(!productExists){
            shoppingList.add(toAppend);
        }
    }

    public static ArrayList<Product> getList(){
        return shoppingList;
    }
}

class ShoppingListView extends HBox{

    private ListView<Product> shoppingList;
    private VBox splitButtonContainer;
    private VBox newItemContainer;
    private Button confirmButton;
    private Button modifyButton;
    private Button addButton;
    
    public ShoppingListView(double spacing) {
        super(spacing);
        this.shoppingList = new ListView<Product>();
        this.newItemContainer = new VBox(10);
        this.confirmButton = new Button("SAVE");
        this.addButton = new Button("MANUAL ENTRY");
        this.modifyButton = new Button("EDIT");
        this.splitButtonContainer = new VBox(10, addButton, modifyButton, confirmButton, newItemContainer);

        this.setAlignment(Pos.CENTER);
        this.setMaxSize(Main.getRoot().getRootCenter().getWidth()*0.9, Main.getRoot().getRootCenter().getHeight()*0.9);
        this.shoppingList.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.45, Main.getRoot().getRootCenter().getHeight()*0.8);
        this.splitButtonContainer.setPrefSize(Main.getRoot().getRootCenter().getWidth()*0.45, Main.getRoot().getRootCenter().getHeight()*0.4);

        this.getChildren().addAll(shoppingList, splitButtonContainer);

        this.addButton.setOnAction(e -> {
            this.manualEntry();
        });
    }

    public void populateList(){

        for (Product product : ShoppingList.getList()) {
          this.shoppingList.getItems().add(product);
        }
    }

    public void manualEntry(){
        IngredientHBox manualEntry = new IngredientHBox(10);
        this.newItemContainer.getChildren().add(manualEntry);

        manualEntry.getRemoveButton().setOnAction(e -> {
            Product manualProduct = Recipe.collectIngredients(manualEntry);
            ShoppingList.appendToShoppingList(manualProduct);
            this.newItemContainer.getChildren().clear();
        });

    }


}





    


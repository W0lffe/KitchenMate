import java.util.ArrayList;
import javafx.scene.layout.VBox;


public class ShoppingList{

    private static ArrayList<Product> shoppingList = new ArrayList<>();

    public static void initShoppingList(){

        VBox mainRootRight = Main.getRoot().getRootRightContainer();
        Main.clearRootRight();

        ShoppingListView listView = new ShoppingListView(10);
        listView.populateTable(shoppingList);

        mainRootRight.getChildren().add(listView);

    }

    public static void appendToShoppingList(Product productToAppend){

        boolean productExists = false;

        for (Product product : shoppingList) {
            if(product.getName().equals(productToAppend.getName())){
                double sum = product.getQuantity() + productToAppend.getQuantity();
                product.setQuantity(sum);
                productExists = true;
                break;
            }
        }

        if(!productExists){
            shoppingList.add(productToAppend);
        }
    }

}
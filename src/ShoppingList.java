import java.util.ArrayList;
import javafx.scene.layout.VBox;


public class ShoppingList{

    private static ArrayList<Product> basket = new ArrayList<>();

    public static void initShoppingList(){

        VBox mainRootRight = Main.getRoot().getRootRightContainer();
        Main.clearRootRight();

        ShoppingListView listView = new ShoppingListView(10);
        listView.populateTable(basket);

        mainRootRight.getChildren().add(listView);

    }

    public static void appendToShoppingList(Product productToAppend){

        boolean productExists = false;

        for (Product product : basket) {
            if(product.getName().equals(productToAppend.getName())){
                double sum = product.getQuantity() + productToAppend.getQuantity();
                product.setQuantity(sum);
                productExists = true;
                break;
            }
        }

        if(!productExists){
            basket.add(productToAppend);
        }
    }

    public static ArrayList<Product> getBasket(){
        return basket;
    }

}
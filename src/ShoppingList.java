import java.util.ArrayList;
import javafx.scene.layout.VBox;


public class ShoppingList{

    private static ArrayList<Product> basket = new ArrayList<>();
    private static boolean savedBasketFetched = false;

    public static void initShoppingList(){

        VBox mainRootRight = Main.getRoot().getRootRightContainer();
        Main.clearRootRight();

        if(!savedBasketFetched){

            if(basket.size() != 0){
                basket.clear();
            }

            Basket savedBasket = HTTP.fetchBasket("Basket");
            for (Product product : savedBasket.getBasket()) {
                appendToShoppingList(product);
            } 
            savedBasketFetched = true;
        }
       
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

    public static void setFetchStatus(boolean status){
       savedBasketFetched = status;
    }

}
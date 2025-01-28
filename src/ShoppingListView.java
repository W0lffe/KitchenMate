import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.collections.FXCollections;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.control.TableColumn;
import java.util.ArrayList;
import javafx.collections.ObservableList;

public class ShoppingListView extends HBox {
    
    private VBox splitContainer;
    private VBox buttonContainer;
    private VBox newItemContainer;
    private Button saveButton;
    private Button manualEntryButton;
    private Button editButton;
    private TableView<Product> productTable;
    private static boolean editInProgress = false;
    private boolean entryInProgress = false;

    
    public ShoppingListView(double spacing) {
        super(spacing);
        this.saveButton = new Button("SAVE");
        this.manualEntryButton = new Button("MANUAL ENTRY");
        this.editButton = new Button("EDIT");
        this.buttonContainer = new VBox(10, saveButton, editButton, manualEntryButton);
        this.newItemContainer = new VBox(10);
        this.splitContainer = new VBox(10, buttonContainer, newItemContainer);
        this.productTable = new TableView<Product>();

        this.setAlignment(Pos.CENTER);
        this.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.9, Main.getRoot().getRootRightContainer().getHeight()*0.9);
        this.productTable.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.45, Main.getRoot().getRootRightContainer().getHeight()*0.9);

        this.splitContainer.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.45, Main.getRoot().getRootRightContainer().getHeight()*0.9);
        this.buttonContainer.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.4, Main.getRoot().getRootRightContainer().getHeight()*0.4);
        this.newItemContainer.setPrefSize(Main.getRoot().getRootRightContainer().getWidth()*0.4, Main.getRoot().getRootRightContainer().getHeight()*0.4);

        this.getChildren().addAll(productTable, splitContainer);

        this.manualEntryButton.setOnAction(e -> { 
            if(!editInProgress){
                entryInProgress = true;
                this.manualEntry();
            }
            else{
                Modal.initInfoModal("Manual entry not allowed while editing list.");
            }
        });

        this.editButton.setOnAction(e -> {
            if(!entryInProgress){
                editInProgress = true;
                Modal.initListModal(ShoppingList.getBasket());
                ShoppingList.initShoppingList();
                editInProgress = false;
            }
            else{
                Modal.initInfoModal("Can't edit list while manual entry is ongoing.");
            }
           
        });

        this.saveButton.setOnAction(e -> {
            if(!editInProgress && !entryInProgress){
                Basket newBasket = new Basket(ShoppingList.getBasket());
                HTTP.saveData(newBasket, "Basket");
            }
            else if(editInProgress){
                Modal.initInfoModal("Saving is not possible while editing list!");
            }
            else if(entryInProgress){
                Modal.initInfoModal("Saving is not possible while manual entry is ongoing.");
            }
           
        });

    }

    public void populateTable(ArrayList<Product> shoppingList){

        if (shoppingList.isEmpty()) {
            this.productTable.setPlaceholder(new Label("Basket is empty!"));
        }
        else{

            double tableWidth = Main.getRoot().getRootRightContainer().getWidth()*0.45;

            ObservableList<Product> products = FXCollections.observableArrayList(shoppingList);
            this.productTable.setItems(products);
    
            // Create the columns only once
            TableColumn<Product, String> productName = new TableColumn<>("Product");
            productName.setCellValueFactory(new PropertyValueFactory<>("name"));
            productName.setPrefWidth(tableWidth/3);
    
            TableColumn<Product, Double> quantityCol = new TableColumn<>("Quantity");
            quantityCol.setCellValueFactory(new PropertyValueFactory<>("quantity"));
            quantityCol.setPrefWidth(tableWidth/3);
            quantityCol.setEditable(true);
    
            TableColumn<Product, String> unitCol = new TableColumn<>("Unit");
            unitCol.setCellValueFactory(new PropertyValueFactory<>("unit"));
            unitCol.setPrefWidth(tableWidth/3);
    
            // Add the columns to the table
            this.productTable.getColumns().setAll(productName, quantityCol, unitCol);

            }
     
        }

        public void manualEntry(){
            
            if (this.newItemContainer.getChildren().size() > 0) {
                Modal.initInfoModal("You can only add one item at the time!");
            }
            else{
                ProductHBox manualEntryBox = new ProductHBox(10);
                Button add = manualEntryBox.getButton();
                add.setText("ADD");
                
                this.newItemContainer.getChildren().addAll(manualEntryBox);

                add.setOnAction(e -> {
                    Product newProduct = ProductHBox.collectProducts(manualEntryBox);
                    ShoppingList.appendToShoppingList(newProduct);
                    ShoppingList.initShoppingList();
                });
            }
        }

        public static boolean getCondition(){
            return editInProgress;
        }




    }


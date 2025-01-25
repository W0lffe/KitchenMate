import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.scene.control.ScrollPane;
import java.util.ArrayList;
import javafx.scene.Node;

public class Modal {

    public static Stage modalStage;

    public static void initListModal(ArrayList<Product> ingredientList){

        modalStage = new Stage();
        modalStage.initModality(Modality.APPLICATION_MODAL);

        ModalWindow modal = new ModalWindow(20);
        modal.populate(ingredientList);

        Scene modalScene = new Scene(modal, Main.getRoot().getRootRightContainer().getWidth()*0.6, Main.getRoot().getRootRightContainer().getHeight()*0.8);
        modalStage.setScene(modalScene);

        modalStage.showAndWait();
    }

    public static void initInfoModal(String error){

        modalStage = new Stage();
        modalStage.initModality(Modality.APPLICATION_MODAL);

        ModalWindow modal = new ModalWindow(20, error);

        Scene modalScene = new Scene(modal, Main.getRoot().getRootRightContainer().getWidth()*0.25, Main.getRoot().getRootRightContainer().getHeight()*0.25);
        modalStage.setScene(modalScene);

        modalStage.showAndWait();
    }

}

class ModalWindow extends VBox{

    private ScrollPane scrollContainer;
    private VBox listContainer;
    private HBox buttonContainer;
    private Button confirmButton;
    private Button cancelButton;
    private Label title;
    
    public ModalWindow(double arg0) {
        super(arg0);
        this.scrollContainer = new ScrollPane();
        this.listContainer = new VBox(10);
        this.confirmButton = new Button("Confirm");
        this.cancelButton = new Button("Cancel");
        this.buttonContainer = new HBox(10, confirmButton, cancelButton);
        this.title = new Label("ADD INGREDIENTS TO BASKET");
        this.title.setFont(new Font(26));
        
        this.scrollContainer.setContent(listContainer);
        this.scrollContainer.setFitToWidth(true);
        this.scrollContainer.setMaxWidth(Main.getRoot().getRootRightContainer().getWidth()*0.4);
        this.scrollContainer.setPrefHeight(Main.getRoot().getRootRightContainer().getHeight()*0.6);
        this.listContainer.setAlignment(Pos.CENTER);
        this.buttonContainer.setAlignment(Pos.CENTER);

        this.setAlignment(Pos.CENTER);
        this.getChildren().addAll(title, scrollContainer, buttonContainer);
        this.cancelButton.setOnAction(e -> Modal.modalStage.close());
        this.confirmButton.setOnAction(e -> {
            for (Node node : this.listContainer.getChildren()) {
                if (node instanceof ProductHBox) {
                    ProductHBox children = (ProductHBox) node;
                    Product productToAppend = ProductHBox.collectProducts(children);
                    //ShoppingList.appendToShoppingList(productToAppend);
                }
            }
            Modal.modalStage.close();
        });
          
           

    }


    public ModalWindow(double spacing, String labelString) {
        super(spacing);
        this.confirmButton = new Button("Confirm");
        this.title = new Label(labelString);

        this.setAlignment(Pos.CENTER);
        this.getChildren().addAll(title, confirmButton);
        this.confirmButton.setOnAction(e -> Modal.modalStage.close());
    }


    public VBox getModalListContainer() {
        return listContainer;
    }
    
    public void populate(ArrayList<Product> ingredientList){

        for (Product ingredient : ingredientList) {
            
            ProductHBox editableIngredientBox = new ProductHBox(10, this.listContainer);
            editableIngredientBox.getProduct().setText(ingredient.getName());
            editableIngredientBox.getQuantity().setText(Double.toString(ingredient.getQuantity()));
            editableIngredientBox.getUnit().setValue(ingredient.getUnit());

            this.listContainer.getChildren().add(editableIngredientBox);
        }
            
    }

    public Button getConfirmButton() {
        return confirmButton;
    }

}

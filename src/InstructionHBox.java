import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.Node;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;
import java.util.ArrayList;

public class InstructionHBox extends HBox {
    
    private TextField stepText;
    private Button deleteStep;

    public InstructionHBox(double spacing, String stepNumber, VBox parent) {
        super(spacing);
        this.deleteStep = new Button("Remove");
        this.stepText = new TextField();
        this.stepText.setPromptText(stepNumber);
        this.stepText.setPrefWidth(Main.getRoot().getRootRightContainer().getWidth()*0.3);

        this.getChildren().addAll(stepText, deleteStep);

        this.deleteStep.setOnAction(e -> {

            int children = 0;

            for (Node node : parent.getChildren()) {
                if(node instanceof InstructionHBox){
                    children++;
                }
            }

            if (children > 1) {
                parent.getChildren().remove(this);
            }
            else{
                Modal.initInfoModal("Need atleast one step of instructions!");
            }
        });
    }

    public TextField getStepText() {
        return stepText;
    }

    public static ArrayList<String> getInstructions(VBox parent){
        ArrayList<String> listToReturn = new ArrayList<>();

        for (Node node : parent.getChildren()) {
            if (node instanceof InstructionHBox) {
                InstructionHBox temp = (InstructionHBox) node;
                if(temp.getStepText().getText() != null || !temp.getStepText().getText().isEmpty())
                    listToReturn.add(temp.getStepText().getText());
            }
        }

        return listToReturn;
    }

}

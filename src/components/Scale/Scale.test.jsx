import { render, screen, fireEvent } from "@testing-library/react";
import Scale from "./Scale";
import { scaleRecipe } from "../../util/util";

vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: (props) => (
        <div data-testid={`fa-icon-${props.icon?.iconName || "unknown"}`} {...props} />
    )
}));

vi.mock("../../util/util", () => ({
    scaleRecipe: vi.fn(({ ingredients, operation, scaledTo }) => ({
        portions: operation === "+" ? scaledTo + 1 : scaledTo - 1,
        ingredients
    }))
})); 

const itemToScale = {
        portions: 2,
        ingredients: [{ name: "Sugar", quantity: 100 }],
        output: "g"
    };

const setScaledState = vi.fn();
const reset = vi.fn();
const isScaled = false;
const scaleFunctions = { setScaledState, reset, isScaled };

const renderScale = () => {
    return render(
        <Scale itemToScale={itemToScale} scaleFunctions={scaleFunctions} />
    )
}

describe("Testing component: Scale", () => {

    beforeEach(() => {
        renderScale();
        vi.clearAllMocks();
    });

    test("renders collapsed and expands when header clicked", () => {
        const header = screen.getByText("Click to Show");
        expect(header).toBeInTheDocument();

        const span = screen.getByText(itemToScale.portions.toString()).parentElement;
        expect(span).toHaveClass("max-h-0");

        fireEvent.click(header);
        expect(header.textContent).toBe("Click to Hide");
        expect(span).toHaveClass("max-h-20");
    });

    test("increments and decrements portions on icon click", () => {
        fireEvent.click(screen.getByTestId("fa-icon-square-minus"));
        
        expect(scaleRecipe).toHaveBeenCalledWith({
            ingredients: itemToScale.ingredients,
            operation: "-",
            scaledTo: 2
        });
        expect(setScaledState).toHaveBeenCalledWith(itemToScale.ingredients);

        fireEvent.click(screen.getByTestId("fa-icon-square-plus"));
        expect(scaleRecipe).toHaveBeenCalledWith({
            ingredients: itemToScale.ingredients,
            operation: "+",
            scaledTo: 1
        });
        expect(setScaledState).toHaveBeenCalledTimes(2);
    });

     test("reset icon calls reset function", () => {
        fireEvent.click(screen.getByTestId("fa-icon-arrow-rotate-left"));
        expect(reset).toHaveBeenCalled();
    });

});
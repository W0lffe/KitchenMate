import { render, screen, fireEvent } from "@testing-library/react";
import FormList from "./FormList";

vi.mock("../Product/Product", () => ({
    default: ({ index }) => <div data-testid="product">Product {index}</div>,
}));
vi.mock("../Instruction/Instruction", () => ({
    default: ({ step }) => <div data-testid="instruction">{step}</div>,
}));

const renderFormList = (use, state) => {
    return render(
        <FormList use={use} state={state} />
    );
}

describe("Testing component: FormList", () => {

    const state_empty = { validInputs: { products: [], steps: [] } }

    test("renders labels when not editing", () => {
        renderFormList("Ingredients", state_empty);
        expect(screen.getByText("Ingredients")).toBeInTheDocument();

        renderFormList("Instructions", state_empty);
        expect(screen.getByText("Instructions")).toBeInTheDocument();
    });

    test("does not render labels when editing", () => {
        renderFormList("Edit", state_empty);
        expect(screen.queryByText("Ingredients")).not.toBeInTheDocument();
        expect(screen.queryByText("Instructions")).not.toBeInTheDocument();
    });

    test("initial count matches validInputs length", () => {
        const state = { validInputs: { products: [1, 2, 3], steps: [] } };
        renderFormList("Ingredients", state);
        expect(screen.getAllByTestId("product")).toHaveLength(3);
    });

    test("increment adds a new item", () => {
        renderFormList("Ingredients", state_empty);
        const plusIcon = screen.getAllByRole("img", { hidden: true })[0];
        fireEvent.click(plusIcon);
        expect(screen.getAllByTestId("product")).toHaveLength(2);
        expect(screen.getAllByTestId("product")).not.toHaveLength(5);

    });

    test("decrement removes an item", () => {
        const state = { validInputs: { products: [], steps: [1, 2] } };
        renderFormList("Instructions", state);
        expect(screen.getAllByTestId("instruction")).toHaveLength(2);
        const minusIcon = screen.getAllByRole("img", { hidden: true })[1];
        fireEvent.click(minusIcon);
        expect(screen.getAllByTestId("instruction")).toHaveLength(1);
    });

    test("decrement removes an item but not below 1", () => {
        renderFormList("Ingredients", state_empty);
        const minusIcon = screen.getAllByRole("img", { hidden: true })[1]; 
        fireEvent.click(minusIcon);
        expect(screen.getAllByTestId("product")).toHaveLength(1); 
    });

})
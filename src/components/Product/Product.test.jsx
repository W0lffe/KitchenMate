import { getAllByRole, getByRole, render, 
        screen } from "@testing-library/react"
import Product from "./Product"

describe("Testing product component", () => {

    test("renders Product with placeholders", ()  => {

        const state = {
            validInputs: {
                products: [],
                quantity: [],
                unit: []
            }
        }

        render(<Product state={state} index={0}/>)

        const placeholders = ["Product", "Quantity"]
        placeholders.forEach(text => {
            const element = screen.getByPlaceholderText(text);
            expect(element).toBeInTheDocument();
        });

        const select = screen.getByDisplayValue("Unit");
        expect(select).toBeInTheDocument();
    })

    test("renders Product with defaultValues", () => {
        
        const state = {
            validInputs: {
                products: ["Testing", "Test"],
                quantity: [500, 600],
                unit: ["g", "kg"]
            }
        }

        render(
            <>
                <Product state={state} index={0} />
                <Product state={state} index={1} />
            </>
        );

        const textInputs = screen.getAllByRole("textbox");
        const numberInputs = screen.getAllByRole("spinbutton");
        const selects = screen.getAllByRole("combobox");

        expect(textInputs[0]).toHaveValue("Testing");
        expect(numberInputs[0]).toHaveValue(500);
        expect(selects[0]).toHaveValue("g");

        expect(textInputs[1]).toHaveValue("Test");
        expect(numberInputs[1]).toHaveValue(600);
        expect(selects[1]).toHaveValue("kg");
        
    })
})
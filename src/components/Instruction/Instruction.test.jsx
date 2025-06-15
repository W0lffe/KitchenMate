import { render, 
        screen } from "@testing-library/react"
import Instruction from "./Instruction"

describe("Testing instruction component", () => {

    test("renders input element", () => {

        render(<Instruction step={"test 1"} state={{}} index={0}/>)
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    })

    test("uses prop step as placeholder", () => {

        const placeholderText = "This is placeholder.";

        render(<Instruction step={placeholderText} state={{}} index={0}/>)
        const inputElement = screen.getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    })

    test("renders defaultValue based on state and index", () => {

        const state = {
            validInputs: {
                steps: [
                    "Testing 1", 
                    "Testing 2",
                    "Testing 3"
                ]
            }
        }

        const length = state.validInputs.steps.length;

        for (let index = 0; index < length; index++) {
            render(<Instruction step={"step"} state={state} index={index}/>)
            const inputElement = screen.getByDisplayValue(state.validInputs.steps[index]);
            expect(inputElement).toBeInTheDocument();
        }
    })
});
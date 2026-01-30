import { render, 
        screen } from "@testing-library/react"
import Instruction from "./Instruction"

describe("Testing instruction component", () => {

    test("renders input element", () => {

        render(<Instruction stepNum={"1."} step={{}}/>)
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    })

    test("uses prop step as placeholder", () => {

        const placeholderText = "This is placeholder.";

        render(<Instruction stepNum={placeholderText} step={{}}/>)
        const inputElement = screen.getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    })

    test("renders the given instruction properly", () => {

        const steps = [
            {step: "Testing 1"},
            {step: "Testing 2"},
            {step: "Testing 3"}
        ]
        
        render(
            <>
            {steps.map((step, i) => (
                <Instruction stepNum={i} step={step}/>
            ))}
            </>
        )

        steps.forEach((step) => {
            const inputElement = screen.getByDisplayValue(step.step);
            expect(inputElement).toBeInTheDocument();
        })

    })
});
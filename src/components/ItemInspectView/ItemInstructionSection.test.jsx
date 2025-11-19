import { render, screen } from "@testing-library/react";
import ItemInstructionSection from "./ItemInstructionSection";

const renderSection = (instructions) => {
    return render(
        <ItemInstructionSection instructions={instructions}/>
    )
}

describe("Testing component: ItemInstructionSection", () => {

    test("renders instructions as expected", () => {

        const instructions = ["Testing", "Tester", "Test"];
        renderSection(instructions);

        instructions.forEach((i, index) => {
            expect(screen.getByText(`${index+1}. ${i}`)).toBeInTheDocument();
        });
    })

    test("renders fallback if array is empty", () => {

        renderSection([]);
        expect(screen.getByText("No instructions added")).toBeInTheDocument();

    })
})
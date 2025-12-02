import { render, screen, fireEvent } from "@testing-library/react";
import RecipeInfoSection from "./RecipeInfoSection";
import { OUTPUTS, CATEGORIES } from "../../util/constants";

const defaultState = {
    validInputs: {
        name: "Test Recipe",
        output: Object.keys(OUTPUTS)[0],
        outputType: OUTPUTS[Object.keys(OUTPUTS)[0]][0],
        portions: 2,
        time: 30,
        timeFormat: "minute(s)",
        category: CATEGORIES[Object.keys(CATEGORIES)[1]][0],
    }
};

const renderSection = (state = defaultState) => {
    render(
        <RecipeInfoSection state={state} user={{ cookType: "professional" }} />
    )
};

describe("Testing component: RecipeInfoSection", () => {

    test("renders all input fields with correct values", () => {
        renderSection();

        const inputField = screen.getByRole("textbox");
        const comboBoxes = screen.getAllByRole("combobox");

        expect(inputField).toHaveAttribute("name", "name");
        expect(inputField.value).toBe(defaultState.validInputs.name);

        expect(comboBoxes[0]).toHaveAttribute("name", "output");
        expect(comboBoxes[0].value).toBe(defaultState.validInputs.output);

        const portionsInput = screen.getByPlaceholderText("Amount");
        expect(portionsInput).toHaveAttribute("type", "number");
        expect(portionsInput.value).toBe(defaultState.validInputs.portions.toString());

        const prepTimeInput = screen.getByPlaceholderText("Prep Time");
        expect(prepTimeInput).toHaveAttribute("type", "number");
        expect(prepTimeInput.value).toBe(defaultState.validInputs.time.toString());

        expect(comboBoxes[1].value).toBe(defaultState.validInputs.timeFormat);

        expect(comboBoxes[2].value).toBe(defaultState.validInputs.category);
    })

    test("changes output and updates outputType select", () => {
        renderSection();

        let comboBoxes = screen.getAllByRole("combobox");
        fireEvent.change(comboBoxes[0], { target: { value: Object.keys(OUTPUTS)[1] } });

        comboBoxes = screen.getAllByRole("combobox");

        expect(comboBoxes[1].value).toBe(OUTPUTS[Object.keys(OUTPUTS)[1]][0]);
    });


})
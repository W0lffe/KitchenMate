import { render, screen, fireEvent } from "@testing-library/react";
import PrefField from "./PrefField";

const renderField = (field, refresh) => {
    return render(
        <PrefField field={field} refresh={refresh} />
    );
}

const mockField = {
        q: "Which one are you?",
        inputName: "cookType",
        values:  ["home", "professional"],
        labels: ["Home Cook", "Professional Cook"],
        p: "Used to customize your experience in the app.",
    };


describe("Testing component: PrefField", () => {
  
    test("renders labels, legend, and description correctly", () => {

        renderField(mockField, {})

        expect(screen.getByText("Which one are you?")).toBeInTheDocument();
        expect(screen.getByText("Pick one")).toBeInTheDocument();
        expect(screen.getByText("Home", {exact: false})).toBeInTheDocument();
        expect(screen.getByText("Professional", {exact: false})).toBeInTheDocument();
    });

    test("initially does not show green border (not toggled)", () => {

        renderField(mockField, {});
        const fieldset = screen.getByRole("group");

        expect(fieldset.className).toContain("border-black");
        expect(fieldset.className).not.toContain("border-green-700");
    });

    test("selecting a radio option toggles the green border", () => {
        renderField(mockField, {});

        const homeCookOption = screen.getByDisplayValue("home");
        const fieldset = screen.getByRole("group");

        fireEvent.click(homeCookOption);

        expect(fieldset.className).toContain("border-green-700");
        expect(fieldset.className).toContain("border-2");
    });

    test("changing refresh resets toggled state", () => {
        const { rerender } = renderField(mockField, {test: "test"});

        const radio = screen.getByDisplayValue("professional");
        const fieldset = screen.getByRole("group");

        fireEvent.click(radio);
        expect(fieldset.className).toContain("border-green-700");

        rerender(<PrefField field={mockField} refresh={{}} />);

        expect(fieldset.className).not.toContain("border-green-700");
        expect(fieldset.className).toContain("border-black");
    });

   
});

import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { KitchenContext } from "../../context/KitchenContext";
import { vi } from "vitest";

// Mock react-dom useFormStatus
vi.mock("react-dom", () => ({
    useFormStatus: vi.fn(() => ({ pending: false })),
}));

// Mock FontAwesomeIcon to avoid rendering issues
vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: ({ icon, onClick }) => <span data-testid="icon" onClick={onClick}></span>
}));



describe("Testing component: Button", () => {
    const setActiveDish = vi.fn();
    const setActiveRecipe = vi.fn();
    const setEntryStatus = vi.fn();
    const setModalState = vi.fn();

    const renderWithContext = (props) =>
        render(
            <KitchenContext.Provider
                value={{ setActiveDish, setActiveRecipe, setEntryStatus, setModalState }}
            >
                <Button {...props} />
            </KitchenContext.Provider>
        );


    test("renders close button and calls context functions on click", () => {
        renderWithContext({ use: "close" });

        const icon = screen.getByTestId("icon");
        fireEvent.click(icon);

        expect(setActiveDish).toHaveBeenCalledWith(null);
        expect(setActiveRecipe).toHaveBeenCalledWith(null);
        expect(setEntryStatus).toHaveBeenCalledWith(null);
        expect(setModalState).toHaveBeenCalledWith({}, false);
    });

    test("renders submit button with text 'Confirm' when not pending", () => {
        renderWithContext({ use: "submit" });

        const button = screen.getByRole("button", { name: "Confirm" });
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

})
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";
import { vi } from "vitest";
import { findRecipeDependencies, scaleRecipe } from "../../util/util";
import { handleToast } from "../../util/toast";

// Mock utilities
vi.mock("../../util/util", () => ({
    findRecipeDependencies: vi.fn(() => []),
    scaleRecipe: vi.fn((args) => ({ ingredients: args.ingredients }))
}));

vi.mock("../../util/toast", () => ({
    handleToast: vi.fn()
}));

const confirmModal = (props, contextProps) => {
    return render(
        <ConfirmModal
            props={props}
            contextProps={contextProps}
        />
    );
}

describe("Testing component: ConfirmModal", () => {
    const setModalState = vi.fn();
    const setActiveDish = vi.fn();
    const setActiveRecipe = vi.fn();
    const handleRequest = vi.fn();

    const ctxProps = {
        setActiveDish,
        setActiveRecipe,
        handleRequest,
        isMobile: false,
        setModalState,
        fullDishes: { current: [] },
        isFetchingData: false,
        user: { cookType: "professional"}
    };

    test("renders delete message for recipes", () => {
        confirmModal({ section: "recipes", toDelete: 1 }, ctxProps);

        expect(screen.getByText("Delete recipe?")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        const confirmButton = screen.getByRole("button", { name: "Confirm" });
        expect(confirmButton).toBeInTheDocument();
    });

    test("renders delete message for dishes", () => {
        confirmModal({ section: "dishes", toDelete: 1 }, ctxProps);

        expect(screen.getByText("Delete dish?")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        const confirmButton = screen.getByRole("button", { name: "Confirm" });
        expect(confirmButton).toBeInTheDocument();
    });

    test("renders delete message for meals", () => {
        confirmModal({ section: "dishes", toDelete: 1 }, {...ctxProps, user: {cookType: "home"}});
        expect(screen.getByText("Delete meal?")).toBeInTheDocument();
    });

    test("renders input field, and is possible to change value", () => {
        confirmModal({ section: "basket", ingredients: ["ingredient1"] }, ctxProps);

        const input = screen.getByRole("spinbutton");
        expect(input.value).toBe("1");

        fireEvent.change(input, { target: { value: 3 } });
        expect(input.value).toBe("3");
    });

    test("cancel button calls setModalState correctly", () => {
        confirmModal({ section: "basket", toDelete: 1 }, ctxProps);

        const cancelBtn = screen.getByText("Cancel");
        fireEvent.click(cancelBtn);

        expect(setModalState).toHaveBeenCalledWith({ section: "basket" }, false);
    });

    test("confirm button disabled when isFetchingData is true", () => {
        confirmModal({ section: "basket", toDelete: 1 }, {...ctxProps, isFetchingData: true});

        const confirmButton = screen.getByRole("button", { name: "Confirm" });
        expect(confirmButton).toBeDisabled();
    });

    test("displays correct message if adding to basket", () => {
        confirmModal({ ingredients: ["test"]}, ctxProps);
        expect(screen.getByText("Add", {exact: false})).toBeInTheDocument();
        expect(screen.getByText("portions to basket", {exact: false})).toBeInTheDocument();

    });



})
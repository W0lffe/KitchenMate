import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";
import { KitchenContext } from "../../context/KitchenContext";

const func = vi.fn();

const testChild = <div data-testid="children">Children of iconbutton</div>

const renderIconButton = (isFetchingData, children) => {
    return render(
        <KitchenContext.Provider value={ {isFetchingData} }>
        <IconButton func={func}>
            {children}
        </IconButton>
        </KitchenContext.Provider>
    )
}

describe("Testing component: IconButton", () => {

    test("renders a single button", () => {
        renderIconButton();
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    test("renders button with children", () => {
        renderIconButton(false, testChild);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByTestId("children")).toBeInTheDocument();
        expect(screen.getByText("children", {exact: false})).toBeInTheDocument();
    })

    test("button is disabled when isFetchingData is true", () => {
        renderIconButton(true, <></>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    test("does not call event handler when is disabled", () => {
        renderIconButton(true, <></>);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();

        fireEvent.click(button);
        expect(func).not.toHaveBeenCalled();
    });

    test("button is not disabled when isFetchingData is false", () => {
        renderIconButton(false, <></>);

        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();
    });

     test("calls event handler when is not disabled", () => {
        renderIconButton(false, <></>);

        const button = screen.getByRole("button");
        expect(button).not.toBeDisabled();

        fireEvent.click(button);
        expect(func).toHaveBeenCalled();
    });

    
})

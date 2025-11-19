import { render, screen, fireEvent } from "@testing-library/react";
import NaviButton from "./NaviButton";

const testChild = <div data-testid="children">Testing</div>
const func = vi.fn();
const testValue = "Testing";

const renderNaviButton = (value, children) => {
    return render(
        <NaviButton func={func} value={value}>
            {children}
        </NaviButton>
    )
}

describe("Testing component: NaviButton", () => {

    test("renders single button", () => {
        renderNaviButton();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.queryByTestId("children")).not.toBeInTheDocument();

    });

    test("renders children in component", () => {
        renderNaviButton(null, testChild);
        expect(screen.getByTestId("children")).toBeInTheDocument();
    })

    test("calls event handler on click", () => {
        renderNaviButton();

        fireEvent.click(screen.getByRole("button"));
        expect(func).toHaveBeenCalled();
    })

    test("calls event handler with the correct value", () => {
        renderNaviButton(testValue);

        fireEvent.click(screen.getByRole("button"));
        expect(func).toHaveBeenCalledWith(testValue);
    })
});
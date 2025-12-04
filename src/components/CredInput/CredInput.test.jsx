import { render, screen } from "@testing-library/react";
import CredInput from "./CredInput";

const renderInput = (isPass, state) => {
    return render(
        <CredInput isPass={isPass} state={state} />
    )
}

describe("Testing component: CredInput", () => {

    test("renders username input with default value from state", () => {
        
        const state = {
            validInputs: {
                user: "TestUser"
            }
        };

        renderInput(false, state);
        
        const input = screen.getByPlaceholderText("Enter username");

        expect(input).toBeInTheDocument();
        expect(input.value).toBe("TestUser");
        expect(input.type).toBe("text");
    });

    test("renders username input empty when no valid user provided", () => {
        const state = {
            validInputs: {}
        };

        renderInput(false, state);

        const input = screen.getByPlaceholderText("Enter username");

        expect(input.value).toBe("");
    });

    test("renders password input without defaultValue", () => {
        const state = {
            validInputs: {
                user: "ShouldNotAppear"
            }
        };

        renderInput(true, state);

        const input = screen.getByPlaceholderText("Enter password");

        expect(input.type).toBe("password");
        expect(input.value).toBe("");
    });

});

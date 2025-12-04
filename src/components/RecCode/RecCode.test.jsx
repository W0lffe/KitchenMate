import { render, screen, fireEvent } from "@testing-library/react";
import RecCode from "./RecCode";
import { useNavigate } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}));

const renderRec = (msg) => {
    return render(
        <RecCode code={"ABC123"} buttonMsg={msg} />
    );
}

describe("Testing component: RecCode", () => {

    test("renders the recovery code text", () => {
        renderRec();

        expect(
            screen.getByText(
                "Below is your account recovery code. Please keep it in a safe place in case you ever need to reset your password."
            )
        ).toBeInTheDocument();

        expect(screen.getByText("ABC123")).toBeInTheDocument();
    });

    test("renders the button with correct message", () => {
        renderRec("Start");

        const button = screen.getByRole("button", { name: "Start" });
        expect(button).toBeInTheDocument();
    });

    test("clicking the button calls navigate('/app')", () => {
        renderRec("Back to App");

        const button = screen.getByRole("button", { name: "Back to App" });

        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/app");
    });
});

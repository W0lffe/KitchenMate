import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { KitchenContext } from "../../context/KitchenContext";
import { vi } from "vitest";

// Mock Button
vi.mock("../Buttons/Button", () => ({
    default: ({ use }) => <button data-testid={`btn-${use}`}>{use}</button>,
}));

vi.mock("../CredInput/CredInput", () => ({
    default: ({ isPass }) => <input data-testid={isPass ? "password" : "username"} />,
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

const renderWithContext = (ctxValue) =>
    render(
        <KitchenContext.Provider value={ctxValue}>
            <LoginForm />
        </KitchenContext.Provider>
    );

describe("Testing component: LoginSignupForm", () => {

    test("renders login form headings and inputs", () => {
        const ctx = { activeModal: { section: "login" }, setModalState: vi.fn(), setUser: vi.fn() };
        renderWithContext(ctx);

        expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByText("Forgot your password?")).toBeInTheDocument();

        expect(screen.getByTestId("btn-close")).toBeInTheDocument();
        expect(screen.getByTestId("btn-login")).toBeInTheDocument();
    });

    test("clicking 'Forgot your password?' navigates to reset-password", () => {
        const ctx = { activeModal: { section: "login" }, setModalState: vi.fn(), setUser: vi.fn() };
        renderWithContext(ctx);

        const forgotPasswordLabel = screen.getByText("Forgot your password?");
        fireEvent.click(forgotPasswordLabel);
        expect(mockNavigate).toHaveBeenCalledWith("/reset-password");
    })

});
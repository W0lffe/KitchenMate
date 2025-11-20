import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./LoginSignupForm";
import { KitchenContext } from "../../context/KitchenContext";
import { vi } from "vitest";

// Mock Button
vi.mock("../Buttons/Button", () => ({
    default: ({ use }) => <button data-testid={`btn-${use}`}>{use}</button>,
}));

// Mock API & toast utilities
vi.mock("../../api/http", () => ({
    userAPI: vi.fn(),
    login: vi.fn(),
}));

vi.mock("../../util/toast", () => ({
    handleToast: vi.fn(),
}));

import { userAPI, login } from "../../api/http";
import { handleToast } from "../../util/toast";

const renderWithContext = (ctxValue) =>
    render(
        <KitchenContext.Provider value={ctxValue}>
            <Signup />
        </KitchenContext.Provider>
    );

describe("Testing component: LoginSignupForm", () => {

    test("renders login form headings and inputs", () => {
        const ctx = { activeModal: { section: "login" }, setModalState: vi.fn(), setUser: vi.fn() };
        renderWithContext(ctx);

        expect(screen.getByRole("heading", { name: "LOGIN" })).toBeInTheDocument();
        expect(screen.getByText("Username:")).toBeInTheDocument();
        expect(screen.getByText("Password:")).toBeInTheDocument();

        expect(screen.getByTestId("btn-close")).toBeInTheDocument();
        expect(screen.getByTestId("btn-login")).toBeInTheDocument();

    });

    test("renders signup form headings and inputs", () => {
        const ctx = { activeModal: { section: "signup" }, setModalState: vi.fn(), setUser: vi.fn() };
        renderWithContext(ctx);

        expect(screen.getByRole("heading", { name: "SIGNUP" })).toBeInTheDocument();
        expect(screen.getByText("Username (1-16 characters):")).toBeInTheDocument();
        expect(screen.getByText("Password (10-16 characters):")).toBeInTheDocument();

        expect(screen.getByTestId("btn-close")).toBeInTheDocument();
        expect(screen.getByTestId("btn-login")).toBeInTheDocument();
    });

})
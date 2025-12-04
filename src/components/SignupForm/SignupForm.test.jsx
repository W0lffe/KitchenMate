import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import * as React from "react";
import SignupForm from "./SignupForm";

vi.mock("../CredInput/CredInput", () => ({ default: () => <div data-testid="cred-input" /> }));
vi.mock("../PrefPanel/PrefPanel", () => ({ default: () => <div data-testid="pref-panel" /> }));
vi.mock("../Image/Photo", () => ({ default: () => <div data-testid="photo" /> }));
vi.mock("../RecCode/RecCode", () => ({ default: ({ code }) => <div data-testid="rec-code">{code}</div> }));
vi.mock("../Buttons/Button", () => ({ default: () => <button data-testid="button">Button</button> }));

vi.mock("../../hooks/useUserForm", () => ({ default: vi.fn(() => vi.fn()) }));
vi.mock("react", async (importOriginal) => {
  const React = await importOriginal();
  return {
    ...React,
    useActionState: vi.fn(),
  };
});

const renderForm = () => {
    return render(
        <SignupForm />
    )
}

describe("SignupForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders initial signup form when success is null", () => {
        vi.mocked(React.useActionState).mockReturnValue([{ validInputs: {} }, vi.fn()]);

        renderForm();

        expect(screen.getByText("Sign Up")).toBeInTheDocument();

        expect(screen.getByTestId("photo")).toBeInTheDocument();
        expect(screen.getAllByTestId("cred-input")).toHaveLength(2);
        expect(screen.getByTestId("pref-panel")).toBeInTheDocument();
        expect(screen.getByTestId("button")).toBeInTheDocument();

        expect(screen.queryByTestId("rec-code")).not.toBeInTheDocument();
    });

    test("renders success view when formState.success is populated", () => {
        vi.mocked(React.useActionState).mockReturnValue([
        { success: { code: "ABC123" }, validInputs: {} },
        vi.fn(),
        ]);

        renderForm();

        expect(screen.getByText("Welcome, chef!")).toBeInTheDocument();
        expect(screen.getByText(/Thank you for signing up!/)).toBeInTheDocument();

        expect(screen.getByTestId("rec-code")).toHaveTextContent("ABC123");

        expect(screen.queryByTestId("pref-panel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("photo")).not.toBeInTheDocument();
        expect(screen.queryAllByTestId("cred-input")).toHaveLength(0);
    });
});

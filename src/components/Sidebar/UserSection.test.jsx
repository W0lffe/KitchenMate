import { render, screen, fireEvent } from "@testing-library/react";
import UserSection from "./UserSection";
import { KitchenContext } from "../../context/KitchenContext";
import { handleToast } from "../../util/toast";

vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: (props) => (
        <div data-testid={`fa-icon-${props.icon?.iconName || "unknown"}`} {...props} />
    )
}));

vi.mock("../../util/toast", () => ({
    handleToast: vi.fn()
}));

const defaultCtx = {
    navigationIsOpen: true,
    user: null,
    setModalState: vi.fn(),
    setUser: vi.fn()
}

const renderUserSection = (ctx) => {
    return render(
        <KitchenContext.Provider value={ctx}>
            <UserSection/>
        </KitchenContext.Provider>
    );
}

describe("Testing component: UserSection", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test("renders login ui if user is not logged in", () => {
        renderUserSection(defaultCtx)

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Not an user yet? Click here to begin.")).toBeInTheDocument();
    })

    test("clicking login calls setModalState", () => {
       renderUserSection(defaultCtx)

        const loginBtn = screen.getByText("Login");
        fireEvent.click(loginBtn);

        expect(defaultCtx.setModalState).toHaveBeenCalledWith({ section: "login" }, true);
    });

    test("clicking signup calls setModalState", () => {
        renderUserSection(defaultCtx)

        const signup = screen.getByText("Not an user yet? Click here to begin.");
        fireEvent.click(signup);

        expect(defaultCtx.setModalState).toHaveBeenCalledWith({ section: "signup" }, true);
    });

    test("renders logged-in user UI", () => {
        const user = { id: "1", name: "Tester", img: null };
        renderUserSection({...defaultCtx, user})

        expect(screen.getByText("Welcome back, Tester!")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Logout"})).toBeInTheDocument();
        expect(screen.getByTestId("fa-icon-right-from-bracket")).toBeInTheDocument
    });

    test("clicking logout clears localStorage, resets user, and calls handleToast", () => {
        const user = { id: "1", name: "Tester", img: null };
        renderUserSection({...defaultCtx, user})

        localStorage.setItem("token", "abc123");

        const logoutBtn = screen.getByRole("button", {name: "Logout"});
        fireEvent.click(logoutBtn);

        expect(localStorage.getItem("token")).toBeNull();
        expect(defaultCtx.setUser).toHaveBeenCalledWith(null);
        expect(handleToast).toHaveBeenCalledWith({ success: "Logged out successfully." });
    });
})
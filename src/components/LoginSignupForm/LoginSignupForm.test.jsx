import { render, 
        screen, 
        fireEvent,
        waitFor } from "@testing-library/react";
import { KitchenContext } from "../../context/KitchenContext";
import LoginSignupForm from "./LoginSignupForm";
import { userAPI } from "../../api/http";
import toast from "react-hot-toast";

function TestComponent({ctx}){
    return(
        <KitchenContext.Provider value={ctx}>
            <LoginSignupForm />
        </KitchenContext.Provider>
    )
}

const renderTest = (ctx) => {
    return render(
        <TestComponent ctx={ctx} />
    )
}

vi.mock("../../api/http", () => ({
  userAPI: vi.fn(),
}));

beforeEach(() => {
  vi.spyOn(toast, "success");
  vi.spyOn(toast, "error");
});

afterEach(() => {
  vi.clearAllMocks(); // clean up spies between tests
});

describe("Testing loginSignupForm component", () => {

    const loginCtx = {
        activeModal: "login",
        setModalState: vi.fn(),
        setUser: vi.fn()
    }

    const signupCtx = {
        activeModal: "signup",
        setModalState: vi.fn(),
        setUser: vi.fn()
    }

    test("form has 2 inputs, and submit button", () => {
        renderTest({activeModal: "", setModalState: vi.fn(), setUser: vi.fn()})

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});

        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument()
    })

    test("submit form with successful login", async () => {

        userAPI.mockResolvedValueOnce({
            success: "Login successful!",
            error: null,
            id: "123"
        })

        renderTest(loginCtx);

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});
        const button = screen.getByRole("button");
        
        fireEvent.change(username, { target: { value: "testuser" } });
        fireEvent.change(password, { target: { value: "securePassword123" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(userAPI).toHaveBeenCalledWith({
                user: { user: "testuser", passwd: "securePassword123" },
                method: "login",
            });

            expect(toast.success).toHaveBeenCalledWith("Login successful!");
            expect(loginCtx.setModalState).toHaveBeenCalledWith(null);
            expect(loginCtx.setUser).toHaveBeenCalledWith({
                name: "testuser",
                id: "123",
            });

        }, {timeout: 1500})
    }) 

    test("submit form with unsuccessful login", async () => {

        userAPI.mockResolvedValueOnce({
            success: null,
            error: "Error when logging in",
            id: null
        })

        renderTest(loginCtx);

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});
        const button = screen.getByRole("button");
        
        fireEvent.change(username, { target: { value: "testuser" } });
        fireEvent.change(password, { target: { value: "securePassword123" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(userAPI).toHaveBeenCalledWith({
                user: { user: "testuser", passwd: "securePassword123" },
                method: "login",
            });
            expect(toast.error).toHaveBeenCalledWith("Error when logging in");
        })
    }) 

    test("submit form with successful user creation", async () => {

        userAPI.mockResolvedValueOnce({
            success: "User created!",
            error: null,
            id: null
        })

        renderTest(signupCtx);

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});
        const button = screen.getByRole("button");
        
        fireEvent.change(username, { target: { value: "testuser" } });
        fireEvent.change(password, { target: { value: "securePassword123" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(userAPI).toHaveBeenCalledWith({
                user: { user: "testuser", passwd: "securePassword123" },
                method: "new",
            });

            expect(toast.success).toHaveBeenCalledWith("User created!");
            expect(signupCtx.setModalState).toHaveBeenCalledWith(null);

        }, {timeout: 1500})
    }) 

    test("submit form with unsuccessful user creation", async () => {

        userAPI.mockResolvedValueOnce({
            success: null,
            error: "Error creating user",
            id: null
        })

        renderTest(signupCtx);

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});
        const button = screen.getByRole("button");
        
        fireEvent.change(username, { target: { value: "testuser" } });
        fireEvent.change(password, { target: { value: "securePassword123" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(userAPI).toHaveBeenCalledWith({
                user: { user: "testuser", passwd: "securePassword123" },
                method: "new",
            });
            expect(toast.error).toHaveBeenCalledWith("Error creating user");
        })
    }) 
})
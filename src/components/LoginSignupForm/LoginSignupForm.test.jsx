import { render, 
        screen } from "@testing-library/react";
import Modal from "../Modal/Modal"
import { KitchenContext } from "../../context/KitchenContext";
import LoginSignupForm from "./LoginSignupForm";

    function TestComponent({ctx}){
        return(
            <KitchenContext.Provider value={ctx}>
               <LoginSignupForm />
            </KitchenContext.Provider>
        )
    }

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
        
        render(<TestComponent ctx={loginCtx}/>)

        const username = screen.getByPlaceholderText("username", {exact: false});
        const password = screen.getByPlaceholderText("password", {exact: false});

        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument()
    })





})
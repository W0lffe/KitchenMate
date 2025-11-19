import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { KitchenContext } from "../../context/KitchenContext";

vi.mock("./UserSection", () => ({
  default: () => <div data-testid="user-section" />
}));

vi.mock("./NaviSection", () => ({
  default: () => <div data-testid="navi-section" />
}));

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props) => <div data-testid="fa-icon-fa-forward" {...props} />
}));


const defaultCtx = {
    toggleNavigation: vi.fn(),
    navigationIsOpen: false, 
    user: {user: "user"}
}

const renderNavigation = (ctx) =>{
    return render(
        <KitchenContext.Provider value={ctx}>
            <Navigation />
        </KitchenContext.Provider>
    );
}

describe("Testing component: Navigation", ()=>{

    test("renders navi toggle icon", () => {
        renderNavigation(defaultCtx);
        expect(screen.getByTestId("fa-icon-fa-forward")).toBeInTheDocument();
    })

    test("calls toggleNavigation when icon is clicked", () =>{
        renderNavigation(defaultCtx);
        const icon = screen.getByTestId("fa-icon-fa-forward");

        fireEvent.click(icon);
        expect(defaultCtx.toggleNavigation).toHaveBeenCalled();
    })

    test("renders userSection", () =>{
        renderNavigation(defaultCtx);
        expect(screen.getByTestId("user-section")).toBeInTheDocument();
        expect(screen.getByTestId("navi-section")).toBeInTheDocument();
    })

    test("does not render navisection if user is not logged in", () =>{
        renderNavigation({...defaultCtx, user: null});
        expect(screen.queryByTestId("navi-section")).not.toBeInTheDocument();
    })

    
    test("renders navisection if user is logged in", () =>{
        renderNavigation(defaultCtx);
        expect(screen.getByTestId("navi-section")).toBeInTheDocument();
    })
})
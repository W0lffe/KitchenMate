import { render, screen, fireEvent } from "@testing-library/react";
import NaviSection from "./NaviSection";
import { KitchenContext } from "../../context/KitchenContext";

vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: (props) => (
        <div data-testid={`fa-icon-${props.icon?.iconName || "unknown"}`} {...props} />
    )
}));

vi.mock("../Buttons/NaviButton", () => ({
    default: ({ func, value, children }) => (
        <button data-testid={`nav-btn-${value}`} onClick={() => func(value)}>
            {children}
        </button>
    )
}));

const defaultCtx = { navigationIsOpen: true, setActiveSection: vi.fn() };

const renderWithContext = (ctx) => {
    return render(
        <KitchenContext.Provider value={ctx}>
            <NaviSection />
        </KitchenContext.Provider>
    )
};


describe("Testing component: NaviSection", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders heading", () => {
        renderWithContext(defaultCtx);
        expect(screen.getByText("NAVIGATION")).toBeInTheDocument();
    });

    test("renders all navigation buttons", () => {
        renderWithContext(defaultCtx);

        const buttons = ["recipes", "dishes", "basket"];
        buttons.forEach((btn) => {
            expect(screen.getByTestId(`nav-btn-${btn}`)).toBeInTheDocument();
        });

        expect(screen.getByTestId("fa-icon-book-open")).toBeInTheDocument();
        expect(screen.getByTestId("fa-icon-utensils")).toBeInTheDocument();
        expect(screen.getByTestId("fa-icon-clipboard-list")).toBeInTheDocument();
    });

    test("clicking buttons calls setActiveSection with correct value", () => {
        renderWithContext(defaultCtx);

        fireEvent.click(screen.getByTestId("nav-btn-recipes"));
        expect(defaultCtx.setActiveSection).toHaveBeenCalledWith("recipes");

        fireEvent.click(screen.getByTestId("nav-btn-dishes"));
        expect(defaultCtx.setActiveSection).toHaveBeenCalledWith("dishes");

        fireEvent.click(screen.getByTestId("nav-btn-basket"));
        expect(defaultCtx.setActiveSection).toHaveBeenCalledWith("basket");
    });
})

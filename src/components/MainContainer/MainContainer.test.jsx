import {
    render,
    screen
} from "@testing-library/react"
import { KitchenContext } from "../../context/KitchenContext"
import MainContainer from "./MainContainer";
import { useIsMobile } from "../../hooks/useIsMobile";

vi.mock("../ActiveSectionWrapper/ActiveSectionWrapper", () => ({
    default: () => (
        <div data-testid="wrapper">Active Section</div>
    )
}));

vi.mock("../../hooks/useIsMobile", () => ({
    useIsMobile: vi.fn(() => true)
}));


const renderWithContext = (contextValue) =>
    render(
        <KitchenContext.Provider value={contextValue}>
            <MainContainer />
        </KitchenContext.Provider>
    );

describe("Testing component: Main Container", () => {

    const setIsMobile = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders ActiveSectionWrapper if activeSection is not undefined", () => {
        renderWithContext({
            activeSection: "recipes",
            setIsMobile: vi.fn()
        })

        expect(screen.getByTestId("wrapper")).toBeInTheDocument();

    })

    test("does not render ActiveSectionWrapper if activeSection is undefined", () => {
        renderWithContext({
            activeSection: undefined,
            setIsMobile: vi.fn()
        });

        expect(screen.queryByTestId("wrapper")).not.toBeInTheDocument();
    });

    test("useIsMobile and setIsMobile is called upon rendering", () => {
        renderWithContext({
            activeSection: undefined,
            setIsMobile
        });

        expect(useIsMobile).toHaveBeenCalled();
        expect(setIsMobile).toHaveBeenCalledWith(true);
    })

})

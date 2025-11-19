import { cleanup, render, screen } from "@testing-library/react"
import ActiveSectionWrapper from "./ActiveSectionWrapper"
import { KitchenContext } from "../../context/KitchenContext"

vi.mock("../List/List", () => ({
    default: () => <div data-testid="list" />
}))
vi.mock("../Toolbar/Toolbar", () => ({
    default: () => <div data-testid="toolbar" />
}))
vi.mock("../ContentWrapper/ContentWrapper", () => ({
    default: () => <div data-testid="content-wrapper" />
}))

const renderWithContext = (contextValue) => {
    return render(
        <KitchenContext.Provider value={contextValue}>
            <ActiveSectionWrapper />
        </KitchenContext.Provider>
    )
}

describe("Testing component: ActiveSectionWrapper", () => {

    test("renders mobile layout when isMobile is true", () => {

        renderWithContext({
            isMobile: true,
            activeSection: "recipes"
        });

        expect(screen.getByTestId("list")).toBeInTheDocument();
        expect(screen.getByTestId("toolbar")).toBeInTheDocument();
        expect(screen.queryByTestId("content-wrapper")).not.toBeInTheDocument();
    })

    test("renders desktop layout when isMobile is false", () => {

        renderWithContext({
            isMobile: false,
            activeSection: "recipes"
        });

        expect(screen.getByTestId("list")).toBeInTheDocument();
        expect(screen.getByTestId("toolbar")).toBeInTheDocument();
    })

    test("shows Recipe Creation heading when mode is 'create'", () => {
        renderWithContext({
            isMobile: false,
            activeSection: "recipes",
            activeRecipe: { mode: "create" }
        })

        expect(screen.getByRole("heading", { name: "Recipe Creation" })).toBeInTheDocument()
    })

    test("shows Dish Details heading when mode is 'detail'", () => {
        renderWithContext({
            isMobile: false,
            activeSection: "dishes",
            activeDish: { mode: "detail" }
        })

        expect(screen.getByRole("heading", { name: "Dish Details" })).toBeInTheDocument()
    })

    test("shows Edit Basket heading when mode is 'detail'", () => {
        renderWithContext({
            isMobile: false,
            activeSection: "basket",
            editStatus: { mode: "edit" }
        })

        expect(screen.getByRole("heading", { name: "Edit Basket" })).toBeInTheDocument()
    })

    test("renders ContentWrapper when there is active mode", () => {

        const modes = ["detail", "edit", "create"];

        for (const mode of modes) {
            renderWithContext({
                isMobile: false,
                activeSection: "dishes",
                activeDish: { mode }
            })
            expect(screen.getByTestId("content-wrapper")).toBeInTheDocument()

            cleanup();
        }
    })

    test("does not render ContentWrapper when active mode is undefined", () => {

        renderWithContext({
            isMobile: false,
            activeSection: "dishes",
            activeDish: { mode: undefined }
        })
        expect(screen.queryByTestId("content-wrapper")).not.toBeInTheDocument()

    })
})



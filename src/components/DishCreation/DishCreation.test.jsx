import { render, screen, fireEvent } from "@testing-library/react";
import { KitchenContext } from "../../context/KitchenContext";
import DishCreation from "./DishCreation";
import { getDishFromValues, getRecipeInfo } from "../../util/util";
import useDishForm from "../../hooks/useDishForm";

vi.mock("../../hooks/useDishForm", () => ({
    default: vi.fn(),
}));

vi.mock("../../util/util", () => ({
    getRecipeInfo: vi.fn(),
    getDishFromValues: vi.fn()
}));

vi.mock("./dishUtil", () => ({
    default: () => ({ updateComponents: vi.fn() }),
}));

vi.mock("../Buttons/Button", () => ({
    default: () => <button data-testid="button-mock" />,
}));

vi.mock("./DishInfoSection", () => ({
    default: () => <div data-testid="dish-info" />,
}));

vi.mock("./ComponentList", () => ({
    default: () => <div data-testid="component-list" />,
}));

vi.mock("../ItemInspectView/ItemInfoSection", () => ({
    default: () => <div data-testid="item-info" />,
}));

vi.mock("../ItemInspectView/ItemListSection", () => ({
    default: () => <div data-testid="item-list" />,
}));

vi.mock("../Buttons/TabButtons", () => ({
    default: ({ func }) => (
        <div>
            <button data-testid="tab-general" onClick={() => func("General")}>General</button>
            <button data-testid="tab-components" onClick={() => func("Components")}>Components</button>
            <button data-testid="tab-confirmation" onClick={() => func("Confirmation")}>Confirmation</button>
        </div>
    ),
}));


const defaultCtx = {
    isMobile: true,
    setModalState: vi.fn(),
    activeDish: { mode: "create", dish: { name: "Test" } },
    availableRecipes: [],
    fullRecipes: { current: [] },
    setActiveDish: vi.fn(),
    handleRequest: vi.fn(),
    filterList: vi.fn(),
    user: { id: "1" },
};

const renderWithContext = (ctx) => {
    return render(
        <KitchenContext.Provider value={ctx}>
            <DishCreation />
        </KitchenContext.Provider>
    );
};


describe("Testing component: DishCreation", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        useDishForm.mockReturnValue(vi.fn());
        getRecipeInfo.mockReturnValue([]);
    });

    test("renders mobile version correctly", () => {
        renderWithContext(defaultCtx);
        expect(screen.getByText("Dish Creation")).toBeInTheDocument();
        expect(screen.getByTestId("dish-info")).toBeInTheDocument();
        expect(screen.getByTestId("button-mock")).toBeInTheDocument();
    });

    test("calls getRecipeInfo on mount", () => {
        renderWithContext(defaultCtx);
        expect(getRecipeInfo).toHaveBeenCalled();
    });

    test("renders desktop version properly", () => {
        renderWithContext({ ...defaultCtx, isMobile: false });
        expect(screen.getByTestId("dish-info")).toBeInTheDocument();
        expect(screen.getByTestId("component-list")).toBeInTheDocument();
    });

    test("renders tab change correctly", () => {
        renderWithContext(defaultCtx);

        getDishFromValues.mockReturnValue({
            name: "Test Dish",
            course: "Main",
            image: new File(["dummy"], "test.png", { type: "image/png" })
        });

        expect(screen.getByTestId("tab-confirmation")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("tab-confirmation"));

        expect(getDishFromValues).toHaveBeenCalled();

        expect(screen.getByTestId("item-info")).toBeInTheDocument();
        expect(screen.getByTestId("item-list")).toBeInTheDocument();
    })

    test("confirmation button calls useDishForm", () => {
        renderWithContext({ ...defaultCtx, isMobile: false });

        expect(screen.getByTestId("dish-info")).toBeInTheDocument();
        expect(screen.getByTestId("component-list")).toBeInTheDocument();

        const confirmBtn = screen.getByTestId("button-mock", { name: "Confirm" });
        expect(confirmBtn).toBeInTheDocument();

        fireEvent.click(confirmBtn);
        expect(useDishForm).toHaveBeenCalled();
    })
});

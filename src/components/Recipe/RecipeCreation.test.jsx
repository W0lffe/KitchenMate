import { render, screen, fireEvent } from "@testing-library/react";
import RecipeCreation from "./RecipeCreation";
import { KitchenContext } from "../../context/KitchenContext";
import useRecipeForm from "../../hooks/useRecipeForm";
import { getRecipeFormValues } from "../../util/util";

vi.mock("../../hooks/useRecipeForm", () => ({
    useRecipeForm: vi.fn(),
}));

vi.mock("../../util/util", () => ({
    getRecipeFormValues: vi.fn(),
}));

vi.mock("../Buttons/Button", () => ({
    default: ({ use }) => <button data-testid={`button-${use}`} />,
}));

vi.mock("./RecipeInfoSection", () => ({
    default: ({ state }) => <div data-testid="recipe-info" />,
}));

vi.mock("../FormList/FormList", () => ({
    default: ({ use, state }) => <div data-testid={`formlist-${use}`} />,
}));

vi.mock("../ItemInspectView/ItemInfoSection", () => ({
    default: ({ state }) => <div data-testid="item-info" />,
}));

vi.mock("../ItemInspectView/ItemListSection", () => ({
    default: ({ state }) => <div data-testid="item-list" />,
}));

vi.mock("../ItemInspectView/ItemInstructionSection", () => ({
    default: ({ instructions }) => <div data-testid="item-instruction" />,
}));

vi.mock("../Buttons/TabButtons", () => ({
    default: ({ func }) => (
        <div>
            <button data-testid="tab-general" onClick={() => func("General")}>General</button>
            <button data-testid="tab-ingredients" onClick={() => func("Ingredients")}>Ingredients</button>
            <button data-testid="tab-instructions" onClick={() => func("Instructions")}>Instructions</button>
            <button data-testid="tab-confirmation" onClick={() => func("Confirmation")}>Confirmation</button>
        </div>
    ),
}));

vi.mock("react", async () => {
    const actual = await vi.importActual("react");
    return {
        ...actual,
        useActionState: vi.fn(() => [{}, vi.fn()]), // returns [formState, formAction]
    };
});

const defaultCtx = {
    isMobile: true,
    handleRequest: vi.fn(),
    setModalState: vi.fn(),
    activeRecipe: {
        mode: "create",
        recipe: {
            name: "Test Recipe",
            ingredients: [],
            instructions: [],
            portions: 1,
            output: 1,
            outputType: "kg",
            time: 30,
            timeFormat: "minute(s)",
            category: "Test"
        }
    },
    setActiveRecipe: vi.fn(),
};


const renderWithContext = (ctx = defaultCtx) => {
    return render(
        <KitchenContext.Provider value={ctx}>
            <RecipeCreation />
        </KitchenContext.Provider>
    )
};

describe("Testing component: RecipeCreation", () => {

    test("renders mobile recipe creation with general tab", () => {
        renderWithContext();

        expect(screen.getByText("Recipe Creation")).toBeInTheDocument();
        expect(screen.getByTestId("recipe-info")).toBeInTheDocument();
        expect(screen.getByTestId("tab-general")).toBeInTheDocument();
    });

    test("switches to confirmation tab on mobile", () => {
        getRecipeFormValues.mockReturnValue({
            name: "Updated",
            portions: [],
            output: [],
            outputType: null,
            time: null,
            timeFormat: null,
            products: [],
            quantity: [],
            unit: [],
            steps: ["step1"],
            category: null
        });

        renderWithContext();

        expect(screen.getByTestId("tab-confirmation")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("tab-confirmation"));

        expect(screen.getByTestId("item-info")).toBeInTheDocument();
        expect(screen.getByTestId("item-list")).toBeInTheDocument();
        expect(screen.getByTestId("item-instruction")).toBeInTheDocument();
    });

    test("renders desktop layout properly", () => {
        renderWithContext({ ...defaultCtx, isMobile: false });

        expect(screen.getByTestId("recipe-info")).toBeInTheDocument();
        expect(screen.getByTestId("formlist-Ingredients")).toBeInTheDocument();
        expect(screen.getByTestId("formlist-Instructions")).toBeInTheDocument();
    });

})

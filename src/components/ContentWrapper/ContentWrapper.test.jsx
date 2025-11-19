import { render, screen } from "@testing-library/react";
import ContentWrapper from "./ContentWrapper";
import { KitchenContext } from "../../context/KitchenContext";

vi.mock("../Recipe/RecipeCreation", () => ({
  default: () => <div data-testid="r-creation">Recipe Creation</div>,
}));

vi.mock("../DishCreation/DishCreation.jsx", () => ({
  default: () => <div data-testid="d-creation">Dish Creation</div>,
}));

vi.mock("../BasketEntryList/BasketEntryList.jsx", () => ({
  default: () => <div data-testid="basket">Basket Entries</div>,
}));

vi.mock("../ItemInspectView/ItemInspectView", () => ({
  default: () => (<div data-testid="item-inspect"></div>)
}));


describe("Testing component: ContentWrapper", () => {

  const renderWithContext = (contextValue) => {
    return render(
      <KitchenContext.Provider value={contextValue}>
        <ContentWrapper />
      </KitchenContext.Provider>
    );
  };

  test("renders RecipeCreation when activeSection is 'recipes' and mode is 'create'", () => {
    renderWithContext({
      activeSection: "recipes",
      activeRecipe: { mode: "create", recipe: null },
      activeDish: null,
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("r-creation")).toBeInTheDocument();
    expect(screen.getByText("Recipe Creation")).toBeInTheDocument();
  });

  test("renders DishCreation when activeSection is 'dishes' and mode is 'create'", () => {
    renderWithContext({
      activeSection: "dishes",
      activeRecipe: null,
      activeDish: { mode: "create", dish: null },
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("d-creation")).toBeInTheDocument();
    expect(screen.getByText("Dish Creation")).toBeInTheDocument();
  });

  test("renders RecipeCreation when activeSection is 'recipes' and mode is 'edit'", () => {
    renderWithContext({
      activeSection: "recipes",
      activeRecipe: { mode: "edit", recipe: {} },
      activeDish: null,
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("r-creation")).toBeInTheDocument();
    expect(screen.getByText("Recipe Creation")).toBeInTheDocument();
  });

  test("renders DishCreation when activeSection is 'dishes' and mode is 'edit'", () => {
    renderWithContext({
      activeSection: "dishes",
      activeRecipe: null,
      activeDish: { mode: "edit", dish: {} },
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("d-creation")).toBeInTheDocument();
    expect(screen.getByText("Dish Creation")).toBeInTheDocument();
  });

  test("renders BasketEntryList when activeSection is 'basket' and editStatus.status is true", () => {
    renderWithContext({
      activeSection: "basket",
      activeRecipe: null,
      activeDish: null,
      isMobile: false,
      editStatus: { status: true },
    });

    expect(screen.getByTestId("basket")).toBeInTheDocument();
    expect(screen.getByText("Basket Entries")).toBeInTheDocument();
  });

  test("renders ItemInspectView for recipe detail mode", () => {
    renderWithContext({
      activeSection: "recipes",
      activeRecipe: {
        mode: "detail",
        recipe: { name: "Pasta" },
      },
      activeDish: null,
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("item-inspect")).toBeInTheDocument();
  });

  test("renders ItemInspectView for dish detail mode", () => {
    renderWithContext({
      activeSection: "dishes",
      activeRecipe: null,
      activeDish: {
        mode: "detail",
        dish: { name: "Carbonara" }
      },
      isMobile: false,
      editStatus: null,
    });

    expect(screen.getByTestId("item-inspect")).toBeInTheDocument();
  });

})
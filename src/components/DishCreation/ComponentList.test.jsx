import { render, screen, fireEvent } from "@testing-library/react";
import ComponentList from "./ComponentList";

vi.mock("@fortawesome/react-fontawesome", () => ({
    FontAwesomeIcon: ({ icon, onClick }) => (
        <span data-testid="icon" onClick={onClick}>{icon.iconName}</span>
    )
}));

vi.mock("../Toolbar/SearchBar", () => ({
    default: ({ filter }) => <div data-testid="search-bar" />
}));

const defaultProps = {
    isMobile: true,
    isRecipe: true,
    listToUse: [
        { id: "1", name: "Recipe1" },
        { id: "2", name: "Recipe2" }
    ],
    isSelected: ["2"],
    handleUpdate: vi.fn(),
    filter: vi.fn()
};

const renderList = (props) => {
    return render(
        <ComponentList {...props} />
    )
}

describe("Testing component: ComponentList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders recipes for mobile correctly", () => {

        renderList({...defaultProps, isProf: true});

        expect(screen.getByText("Add Recipes to Dish")).toBeInTheDocument();

        expect(screen.getByText("Recipe1")).toBeInTheDocument();
        expect(screen.getByText("Recipe2")).toBeInTheDocument();

        const icons = screen.getAllByTestId("icon");
        expect(icons).toHaveLength(2);

        fireEvent.click(icons[0]);
        expect(defaultProps.handleUpdate).toHaveBeenCalledWith("1");
    });

    test("renders correct heading for non professionals", () => {
        renderList({...defaultProps, isProf: false});
        expect(screen.getByText("Add Recipes to Meal")).toBeInTheDocument();
    })

    test("renders fallback when list is empty", () => {
        renderList({ ...defaultProps, listToUse: [] })
        expect(screen.getByText("Recipe list is empty.")).toBeInTheDocument();
    });

    test("renders fallback for non recipes and to professionals when list is empty", () => {
        renderList({ ...defaultProps, listToUse: [], isRecipe: false, isProf: true })
        expect(screen.getByText("No components added yet")).toBeInTheDocument();
    });

     test("renders fallback for non recipes and to non professionals when list is empty", () => {
        renderList({ ...defaultProps, listToUse: [], isRecipe: false, isProf: false })
        expect(screen.getByText("No recipes added yet")).toBeInTheDocument();
    });

    test("renders desktop version correctly", () => {
        renderList({ ...defaultProps, isMobile: false, isProf: true})

        expect(screen.getByText("Add Recipes to Dish")).toBeInTheDocument();

        expect(screen.getByText("Recipe1")).toBeInTheDocument();
        expect(screen.getByText("Recipe2")).toBeInTheDocument();

        expect(screen.queryByText("Recipe list is empty.")).not.toBeInTheDocument();
    });



    

})
import { render, screen } from "@testing-library/react";
import ItemInfoSection from "./ItemInfoSection";

vi.mock("../Scale/Scale", () => ({
    default: () => <div data-testid="scale"></div>,
}));

vi.mock("../Image/Photo", () => ({
    default: ({ img }) => <div data-testid="photo">{img}</div>,
}));

const defaultRecipeState = {
    validInputs: {
        name: "Test Recipe",
        outputType: "kg",
        portions: 4,
        time: 30,
        timeFormat: "minute(s)"
    }
};

const defaultDishItem = {
    name: "Test Dish",
    course: "Main",
    image: "image.png",
};

const scaleFunctions = {
    func: vi.fn()
}

const renderSection = (props) => {
    return render(
        <ItemInfoSection {...props} />
    )
}

describe("Testing component: ItemInfoSection", () => {

    test("renders recipe info correctly", () => {
        renderSection({ isRecipe: true, state: defaultRecipeState, scaleFunctions })

        expect(screen.getByText("Test Recipe")).toBeInTheDocument();
        expect(screen.getByText("Yield: kg, approx. 4 portions")).toBeInTheDocument();
        expect(screen.getByText("Prep Time: 30 minute(s)")).toBeInTheDocument();
        expect(screen.getByTestId("scale")).toBeInTheDocument();
    });

    test("renders dish info with image", () => {
        renderSection({ isRecipe: false, item: defaultDishItem })

        expect(screen.getByText("Test Dish")).toBeInTheDocument();
        expect(screen.getByText("Course: Main")).toBeInTheDocument();

        // Photo component should render
        expect(screen.getByTestId("photo")).toBeInTheDocument();
        expect(screen.getByTestId("photo")).toHaveTextContent("image.png");
    });

    test("handles missing values", () => {
        const nullState = { 
            validInputs: { 
                name: "", 
                portions: 0, 
                outputType: null, 
                time: 0,
                 timeFormat: "" 
                } 
        }
        render(<ItemInfoSection isRecipe={true} state={nullState} />);

        expect(screen.queryByText(/Yield/)).toBeNull();
        expect(screen.queryByText(/Prep Time/)).toBeNull();
    });



}) 
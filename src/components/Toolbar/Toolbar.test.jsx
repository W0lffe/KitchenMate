import { render, screen, fireEvent } from "@testing-library/react";
import Toolbar from "./Toolbar";
import { KitchenContext } from "../../context/KitchenContext";
import { handleToast } from "../../util/toast";

vi.mock("./SearchBar", () => ({
    default: () => <div data-testid="search" />
}))

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props) => (
    <div data-testid={`fa-icon-${props.icon?.iconName || "unknown"}`} {...props} />
  )
}));

vi.mock("../../util/toast", () => ({
  handleToast: vi.fn()
}));




const defaultCtx = {
    isMobile: false,
    setActiveRecipe: vi.fn(),
    setActiveDish: vi.fn(),
    setModalState: vi.fn(),
    filterList: vi.fn(),
    sortList: vi.fn(),
    activeSection: "recipes",
    setEntryStatus: vi.fn(),
    activeDish: null,
    fullBasket: { current: [] },
};

const renderToolbarWithCtx = (ctx) => {
    return render(
        <KitchenContext.Provider value={ctx}>
            <Toolbar />
        </KitchenContext.Provider>
    )
}


describe("Testing component: Toolbar", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test("renders searchbar", () => {

        renderToolbarWithCtx(defaultCtx);
        expect(screen.getByTestId("search")).toBeInTheDocument();
    })

    test("renders FontAwesome icons", () => {
        renderToolbarWithCtx(defaultCtx);
        expect(screen.getAllByTestId("fa-icon", {exact: false})).not.toHaveLength(0);
    });

    test("initializes recipe creation when clicking + icon (desktop)", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "recipes"});

        const plusButton = screen.getByTestId("fa-icon-folder-plus");

        fireEvent.click(plusButton);

        expect(defaultCtx.setActiveRecipe).toHaveBeenCalledWith({
            recipe: null,
            mode: "create"
        });
    });

    test("initializes recipe creation when clicking + icon (mobile)", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "recipes", isMobile: true});

        const plusButton = screen.getByTestId("fa-icon-folder-plus");

        fireEvent.click(plusButton);

        expect(defaultCtx.setActiveRecipe).toHaveBeenCalledWith({
            recipe: null,
            mode: "create"
        });

        expect(defaultCtx.setModalState).toHaveBeenCalledWith({section: "recipes"}, true);
    });

    test("initializes dish creation when clicking + icon (desktop)", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "dishes"});

        const plusButton = screen.getByTestId("fa-icon-folder-plus");

        fireEvent.click(plusButton);

        expect(defaultCtx.setActiveDish).toHaveBeenCalledWith({
            dish: null,
            mode: "create"
        });
    });

    test("initializes dish creation when clicking + icon (mobile)", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "dishes", isMobile: true});

        const plusButton = screen.getByTestId("fa-icon-folder-plus");

        fireEvent.click(plusButton);

        expect(defaultCtx.setActiveDish).toHaveBeenCalledWith({
            dish: null,
            mode: "create"
        });

        expect(defaultCtx.setModalState).toHaveBeenCalledWith({section: "dishes"}, true);
    });

    test("does not call setModalState if basket is empty, calls handleToast instead", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket"});
        
        const clearButton = screen.getByRole("button", {name: "Clear List"});
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        expect(handleToast).toHaveBeenCalledWith({error: "Basket is empty!"});
        expect(defaultCtx.setModalState).not.toHaveBeenCalled();

    })

    test("calls setModalState if basket has items", () => {

        const basket = ["test"];
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket", fullBasket: {current: basket}});
        
        const clearButton = screen.getByRole("button", {name: "Clear List"});
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);
        
        expect(defaultCtx.setModalState).toHaveBeenCalledWith({
            section: "basket",
            toDelete: basket
        }, true);

    })

    test("does not call setEntryStatus if basket is empty", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket"});

        const editBtn = screen.getByTestId("fa-icon-pen-to-square");
        expect(editBtn).toBeInTheDocument();
        
        fireEvent.click(editBtn);

        expect(handleToast).toHaveBeenCalledWith({error: "Can't edit empty basket!"});
        expect(defaultCtx.setEntryStatus).not.toHaveBeenCalled();

    })

    test("does not call setEntryStatus or setModalSate if basket is empty and isMobile is true", () => {
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket", isMobile: true});

        const editBtn = screen.getByTestId("fa-icon-pen-to-square");
        expect(editBtn).toBeInTheDocument();
        
        fireEvent.click(editBtn);

        expect(handleToast).toHaveBeenCalledWith({error: "Can't edit empty basket!"});
        expect(defaultCtx.setEntryStatus).not.toHaveBeenCalled();
        expect(defaultCtx.setModalState).not.toHaveBeenCalled();
    })

    test("calls setEntryStatus if basket has items", () => {
        const basket = ["test"];
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket", fullBasket: {current: basket}});

        const editBtn = screen.getByTestId("fa-icon-pen-to-square");
        expect(editBtn).toBeInTheDocument();
        
        fireEvent.click(editBtn);

        expect(defaultCtx.setEntryStatus).toHaveBeenCalledWith({status: true, mode: "edit"});
        expect(defaultCtx.setModalState).not.toHaveBeenCalled();
    })

    test("calls setEntryStatus if basket has items, and setModalState if isMobile is true", () => {
        const basket = ["test"];
        renderToolbarWithCtx({...defaultCtx, activeSection: "basket", fullBasket: {current: basket}, isMobile: true});

        const editBtn = screen.getByTestId("fa-icon-pen-to-square");
        expect(editBtn).toBeInTheDocument();
        
        fireEvent.click(editBtn);

        expect(defaultCtx.setEntryStatus).toHaveBeenCalledWith({status: true, mode: "edit"});
        expect(defaultCtx.setModalState).toHaveBeenCalledWith({section: "basket"}, true);
    })
})
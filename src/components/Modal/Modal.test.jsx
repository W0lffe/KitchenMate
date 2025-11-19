import {
    render,
    screen
} from "@testing-library/react"
import Modal from "./Modal"
import { KitchenContext } from "../../context/KitchenContext"

beforeEach(() => {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.appendChild(modal);

    HTMLDialogElement.prototype.showModal = vi.fn(function () {
        this.setAttribute("open", "");
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
        this.removeAttribute("open");
    })
})

afterEach(() => {
    document.getElementById("modal").remove();
    vi.clearAllMocks();
})

vi.mock("./ContentModal", () => ({
    default: ({ section, editStatus }) => (
        <div data-testid="content-modal">{section}-{editStatus?.mode}</div>
    )
}));

vi.mock("./ConfirmModal", () => ({
    default: ({ props, contextProps }) => (
        <div data-testid="confirm-modal">
            Confirm-{props.section}-{contextProps.isMobile ? "mobile" : "desktop"}
        </div>
    )
}));

vi.mock("react-hot-toast", () => ({
    Toaster: () => <div data-testid="toaster" />
}));

const renderWithContext = (contextValue) =>
    render(
        <KitchenContext.Provider value={contextValue}>
            <Modal />
        </KitchenContext.Provider>
    );


describe("Testing component: Modal", () => {

    test("renders dialog, when modal is not open", () => {
        renderWithContext({ activeModal: "", modalIsOpen: false, editStatus: null });
        const dialog = screen.getByRole("dialog", { hidden: true });
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
        expect(dialog).toBeInTheDocument();
    })

    test("renders dialog, when modal is open", () => {
        renderWithContext({ activeModal: "", modalIsOpen: true, editStatus: null });
        const dialog = screen.getByRole("dialog");
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        expect(dialog).toBeInTheDocument();
    })

    test("renders ContentModal when useConfirm is false", () => {
        const context = {
            activeModal: { section: "recipes" },
            modalIsOpen: true,
            editStatus: null,
            setModalState: vi.fn(),
            setActiveDish: vi.fn(),
            setActiveRecipe: vi.fn(),
            handleRequest: vi.fn(),
            isMobile: false,
            fullDishes: [],
            isFetchingData: false,
        };

        renderWithContext(context);

        expect(screen.getByTestId("content-modal")).toBeInTheDocument();
        expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
    });

    test("renders ConfirmModal when useConfirm is true", () => {
        const context = {
            activeModal: { section: "dishes", toDelete: 1, },
            modalIsOpen: true,
            editStatus: null,
            setModalState: vi.fn(),
            setActiveDish: vi.fn(),
            setActiveRecipe: vi.fn(),
            handleRequest: vi.fn(),
            isMobile: false,
            fullDishes: [],
            isFetchingData: false,
        };

        renderWithContext(context);

        expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
        expect(screen.queryByTestId("content-modal")).not.toBeInTheDocument();
    });

})


import { render, 
        screen } from "@testing-library/react"
import Modal from "./Modal"
import { KitchenContext } from "../../context/KitchenContext"

beforeEach(() => {
        const modal = document.createElement("div");
        modal.setAttribute("id", "modal");
        document.body.appendChild(modal);

        HTMLDialogElement.prototype.showModal = vi.fn(function (){
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

    const renderModal = (ctx) => {
        return render(
            <KitchenContext.Provider value={ctx}>
                <Modal />
            </KitchenContext.Provider>
        )
    }

describe("Modal component testing for dialog", () => {

    test("renders dialog, when modal is not open", () => {
        renderModal({activeModal: "", modalIsOpen: false, editStatus: null});
        const dialog = screen.getByRole("dialog", {hidden: true});
        expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
        expect(dialog).toBeInTheDocument();
    })

    test("renders dialog, when modal is open", () => {
        renderModal({activeModal: "", modalIsOpen: true, editStatus: null});
        const dialog = screen.getByRole("dialog");
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        expect(dialog).toBeInTheDocument();
    })

    test("renders LoginSignupForm when activeModal is login", () => {
        renderModal({activeModal: "login", modalIsOpen: true, editStatus: null});
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        const header = screen.getByRole("heading", {level: 3});
        expect(header).toHaveTextContent("LOGIN");
        expect(header).toBeInTheDocument();
    })

    test("renders LoginSignupForm when activeModal is signup", () => {
        renderModal({activeModal: "signup", modalIsOpen: true, editStatus: null});
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        const header = screen.getByRole("heading", {level: 3});
        expect(header).toHaveTextContent("SIGNUP");
        expect(header).toBeInTheDocument();
    })

    test("renders ContentWrapper when activeModal is recipes", () => {

        const recipesCtx = {
            activeModal: "recipes", 
            modalIsOpen: true, 
            editStatus: null,
            activeSection: "recipes",
            activeRecipe: {mode: "create"},
            activeDish: null,
            isMobile: true
        }

        renderModal(recipesCtx);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        const header = screen.getByRole("heading", {level: 2});
        expect(header).toHaveTextContent("Recipe Creation");
        expect(header).toBeInTheDocument();
    })

    test("renders ContentWrapper when activeModal is dishes", () => {
        const dishesCtx = {
            activeModal: "dishes", 
            modalIsOpen: true, 
            editStatus: null,
            activeSection: "dishes",
            activeRecipe: null,
            activeDish: {mode: "create"},
            isMobile: true,
            availableRecipes: []
        }

        renderModal(dishesCtx);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        const header = screen.getByRole("heading", {level: 2});
        expect(header).toHaveTextContent("Dish Creation");
        expect(header).toBeInTheDocument();
    })

    test("renders ContentWrapper when activeModal is basket", () => {
        const basketCtx = {
            activeModal: "basket", 
            modalIsOpen: true, 
            editStatus: {status: true, mode: "edit"},
            activeSection: "basket",
            activeRecipe: null,
            activeDish: null,
            isMobile: true,
            fullBasket: {current: []}
        }

        renderModal(basketCtx);
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
        const header = screen.getByRole("heading", {level: 3});
        expect(header).toHaveTextContent("Edit Basket");
        expect(header).toBeInTheDocument();
    })


})


import { useContext, 
        useEffect, 
        useRef } from "react";
import { createPortal } from "react-dom";
import { KitchenContext } from "../../context/KitchenContext";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import RecipeContent from "../RecipeContent/RecipeContent";

export default function Modal(){

    const {activeModal, modalIsOpen} = useContext(KitchenContext)
    const modal = useRef()

    useEffect(() => {
        modalIsOpen ? modal.current.showModal() : modal.current.close();
    }, [modalIsOpen])
   
    return createPortal(
        <div>
            <dialog ref={modal} className="backdrop:bg-gray-900/90">
                {activeModal === "signup" || activeModal === "login" ? <LoginSignupForm /> : null}
                {activeModal === "recipe" ? <RecipeContent /> : null}
            </dialog>
        </div>,document.getElementById("modal")
    )
}
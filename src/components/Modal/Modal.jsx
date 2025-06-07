import { useContext, 
        useEffect, 
        useRef } from "react";
import { createPortal } from "react-dom";
import { KitchenContext } from "../../context/KitchenContext";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { Toaster } from "react-hot-toast";

export default function Modal(){

    const {activeModal, modalIsOpen, editStatus} = useContext(KitchenContext)
    const modal = useRef()

    useEffect(() => {
        modalIsOpen ? modal.current.showModal() : modal.current.close();
    }, [modalIsOpen])
   
    return createPortal(
        <div>
            <dialog ref={modal} className="backdrop:bg-gray-900/90">
                <Toaster />
                {activeModal === "signup" || activeModal === "login" ? <LoginSignupForm /> : null}
                {activeModal === "recipes" ? <ContentWrapper /> : null}
                {activeModal === "dishes" ? <ContentWrapper /> : null}
                {editStatus?.status ? <ContentWrapper /> : null}
            </dialog>
        </div>,document.getElementById("modal")
    )
}
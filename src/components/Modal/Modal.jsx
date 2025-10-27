import { useContext, 
        useEffect, 
        useRef } from "react";
import { createPortal } from "react-dom";
import { KitchenContext } from "../../context/KitchenContext";
import ContentModal from "./ContentModal";
import ConfirmModal from "./ConfirmModal";
import { Toaster } from "react-hot-toast";

export default function Modal(){

    const {activeModal, modalIsOpen, editStatus, setActiveDish, setActiveRecipe, handleRequest, isMobile, setModalState, fullDishes, isFetchingData} = useContext(KitchenContext)

    const {section, toDelete} = activeModal;
    const modal = useRef()

    const contextProps = {
        setModalState,
        handleRequest, 
        setActiveDish, 
        setActiveRecipe,
        isMobile,
        fullDishes,
        isFetchingData
    }

    useEffect(() => {
        modalIsOpen ? modal.current.showModal() : modal.current.close();
    }, [modalIsOpen])

    return createPortal(
            <dialog ref={modal} className="backdrop:bg-gray-900/90">
                {modalIsOpen && <Toaster />}
                {toDelete === undefined ? (
                    <ContentModal section={section} editStatus={editStatus}/>
                ) : (
                    <ConfirmModal section={section} toDelete={toDelete} contextProps={contextProps}/>
                )}
            </dialog>,
            document.getElementById("modal")
    )
}
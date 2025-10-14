import toast from "react-hot-toast";
import {confirmModalStyle, confirmButtonStyle, headerStyle, headingStyle, spanStyle, cancelButtonStyle} from "./modalStyles.js"

export default function ConfirmModal({section, toDelete, contextProps}){


    const {setActiveDish, setActiveRecipe, handleRequest, isMobile, setModalState} = contextProps;
    const clearBasket = Array.isArray(toDelete);

    let message = "Delete ";
    if (section.toLowerCase().includes("recipes")) {
        message += "recipe?";
    } else if (section.toLowerCase().includes("dishes")) {
        message += "dish?";
    } else {
        message += "product?";
    }

    if(clearBasket){
        message = "Empty basket?"
    }

    const handleDelete = async() => {

        const response = await handleRequest({
           data: clearBasket ? [] : {id: toDelete},
           method: clearBasket ? "PUT" : "DELETE"
        })

        const {error, success} = response;
        if(error){
            toast.error(error);
            return;
        }

        clearBasket ? toast.success("Basket cleared!") : toast.success(success)

        setModalState({}, false)
        setActiveDish(null);
        setActiveRecipe(null); 
    }

    const handleCancel = () => {
        const modalState = !isMobile ? false : (section === "basket" ? false : true);

        setModalState({
            section
        }, modalState)
    }

    return(
        <div className={confirmModalStyle}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>Confirm</h3>
                <label>{message}</label>
            </header>
            <span className={spanStyle}>
                <button onClick={handleCancel} className={cancelButtonStyle}>Cancel</button>
                <button onClick={handleDelete} className={confirmButtonStyle}>Confirm</button>
            </span>
        </div>
    )
}
import {
    confirmModalStyle,
    confirmButtonStyle,
    headerStyle,
    headingStyle,
    spanStyle,
    cancelButtonStyle
} from "./modalStyles.js"
import { findRecipeDependencies } from "../../util/util.js";
import { handleToast } from "../../util/toast.js";

export default function ConfirmModal({ props, contextProps }) {

    const {section, toDelete, ingredients} = props;
    const isDelete = toDelete !== undefined && ingredients === undefined;

    const { 
        setActiveDish,
        setActiveRecipe,
        handleRequest, 
        isMobile, 
        setModalState, 
        fullDishes, 
        isFetchingData } = contextProps;

    let message = "";
    const dependencies = [];
     
    if(toDelete){
        const clearBasket = Array.isArray(toDelete);
        if (clearBasket) {
            message = "Empty basket?"
        }
        else if (section.toLowerCase().includes("recipes")) {
            message = "Delete recipe?";

            const foundDependencies = findRecipeDependencies(toDelete, fullDishes.current);
            if (foundDependencies.length > 0) {
                message = "Deleting this recipe will also delete the following dishes:";
                dependencies.push(foundDependencies);
            }
        } else if (section.toLowerCase().includes("dishes")) {
            message = "Delete dish?";
        } else {
            message = "Delete product?";
        }
    }
    if(ingredients){

    }

    const handleDelete = async () => {

        const dataToDelete = dependencies.length > 0 ? { id: toDelete, dependencies } : { id: toDelete };

        const response = await handleRequest({
            data: clearBasket ? [] : dataToDelete,
            method: clearBasket ? "PUT" : "DELETE"
        })

        const { error, success } = response;

        handleToast({
            error,
            success: clearBasket ? "Basket cleared!" : success,
            setModalState,
            setActiveDish,
            setActiveRecipe,
            delay: 0
        })
    }

    const handleCancel = () => {
        const modalState = !isMobile ? false : (section === "basket" ? false : true);

        setModalState({ section }, modalState)
    }

    return (
        <div className={confirmModalStyle}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>Confirm</h3>
                <label>{message}</label>
                {isDelete ? (
                    dependencies.length > 0 &&
                    <ul className="list-disc flex flex-col items-start px-5 gap-1">
                        {
                            fullDishes.current
                                .filter((dish) => dependencies.includes(dish.id))
                                .map((dish, i) => (<li key={i} className="font-light animate-pulse">{dish.name}</li>))
                        }
                    </ul>
                
                ) : (
                    <>
                    test</>
                )}
            </header>
            <span className={spanStyle}>
                <button onClick={handleCancel} className={cancelButtonStyle}>Cancel</button>
                <button onClick={handleDelete} className={confirmButtonStyle} disabled={isFetchingData}>Confirm</button>
            </span>
        </div>
    )
}
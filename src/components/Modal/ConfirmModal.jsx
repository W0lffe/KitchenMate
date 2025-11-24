import {
    confirmModalStyle,
    confirmButtonStyle,
    headerStyle,
    headingStyle,
    spanStyle,
    cancelButtonStyle,
    listStyle,
    inputStyle
} from "./modalStyles.js"
import { findRecipeDependencies } from "../../util/util.js";
import { handleToast } from "../../util/toast.js";
import { useState } from "react";
import { scaleRecipe } from "../../util/util.js";

/**
 * Confirmation modal for deletions and adding portions to basket.
 * @param {Object} props properties for the modal to choose content
 * @param {Object} contextProps context properties for handling requests and state updates
 * @return UI for confirmation modal
 */
export default function ConfirmModal({ props, contextProps }) {

    const { section, toDelete, ingredients } = props;
    const isDelete = toDelete !== undefined && ingredients === undefined;
    const [count, setCount] = useState(1);

    const {
        setActiveDish,
        setActiveRecipe,
        handleRequest,
        isMobile,
        setModalState,
        fullDishes,
        isFetchingData,
        user } = contextProps;

    let message = "";
    const dependencies = [];
    const clearBasket = Array.isArray(toDelete);

    if (toDelete) {

        if (clearBasket) {
            message = "Empty basket?"
        }
        else if (section.toLowerCase().includes("recipes")) {
            message = "Delete recipe?";

            const foundDependencies = findRecipeDependencies(toDelete, fullDishes.current);
            if (foundDependencies.length > 0) {
                message = `Deleting this recipe will also delete the following ${user.cookType === "professional" ? "dishes" : "meals"}:`;
                dependencies.push(...foundDependencies);
            }
        } else if (section.toLowerCase().includes("dishes")) {
            message =` Delete ${user.cookType === "professional" ? "dish?" : "meal?"}`;
        } else {
            message = "Delete product?";
        }
    }
    if (ingredients) {
        message = "How many portions?";
    }

    /**
     * Function to handle deletion confirmation, sending delete request and updating state
     */
    const handleDelete = async () => {
        const dataToDelete = dependencies.length > 0 ? { id: toDelete, dependencies } : { id: toDelete };

        const response = await handleRequest({
            data: clearBasket ? [] : dataToDelete,
            method: "DELETE"
        })

        const { error, success } = response;

        handleToast({
            error,
            success,
            setModalState,
            setActiveDish,
            setActiveRecipe,
            delay: 0
        })
    }

    /**
     * Function to handle adding portions to basket, sending post request with scaled ingredients
     */
    const handleAddCart = async () => {
        
        const products = scaleRecipe({
            ingredients,
            scaledTo: 1,
            scaleTo: count
        })

        const response = await handleRequest({
            data: products.ingredients,
            method: "POST"
        }, true)

        const { error } = response;

        handleToast({
            error,
            success: "Products added to basket successfully!",
            isMobile,
            setModalState
        })
    }

    /**
     * Determine onClick handler based on action type
     */
    const onClick = isDelete ? handleDelete : handleAddCart;

    /**
     * Function to handle cancel action, closing or adjusting modal based on device and section
     */
    const handleCancel = () => {
        const modalState = !isMobile ? false : (section === "basket" ? false : true);

        setModalState({ section }, modalState)
    }


    return (
        <div className={confirmModalStyle}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>Confirm</h3>
            </header>
            {isDelete ? (
                <>
                    <label>{isFetchingData ? "Deleting..." : message}</label>
                    {dependencies.length > 0 &&
                        <ul className={listStyle}>
                            {
                                fullDishes.current
                                    .filter((dish) => dependencies.includes(dish.id))
                                    .map((dish, i) => (<li key={i} className="font-light animate-pulse">{dish.name}</li>))
                            }
                        </ul>
                    }
                </>
            ) : (
                <label className="text-lg w-max p-1">
                    Add
                    <input type="number"
                        className={inputStyle}
                        min={1}
                        defaultValue={count}
                        onChange={(event) => setCount(event.target.value)}
                    />
                    portions to basket
                </label>
            )}
            <span className={spanStyle}>
                <button onClick={handleCancel} className={cancelButtonStyle}>Cancel</button>
                <button onClick={onClick} className={confirmButtonStyle} disabled={isFetchingData}>Confirm</button>
            </span>
        </div>
    )
}
import { combineProductData } from "../../util/util";
import { listSection, getListStyle } from "./inspectStyles";
import { useState, useEffect, useContext } from "react";
import ItemHoverPopup from "../ItemHoverPopup/ItemHoverPopup";
import { KitchenContext } from "../../context/KitchenContext";

/**
 * Component displaying the list of ingredients/components for the inspected item.
 * @param {boolean} isRecipe indicates if the item is a recipe
 * @param {Array} list list of ingredients/components to display
 * @param {Object} state current form state containing valid inputs
 * @returns component UI for item list section
 */
export default function ItemListSection({ isRecipe, list, state, isProf }) {

    const [activeItem, setActiveItem] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const {isMobile} = useContext(KitchenContext)

    const isPreview = state !== undefined;

    const combinedList =
        (isRecipe && isPreview) &&
        combineProductData(
            state.validInputs.products,
            state.validInputs.quantity,
            state.validInputs.unit
        );

    const gotList = isPreview ? combinedList : list;
    const style = isRecipe && "ingredients";

    const handleClick = (e, item) => {
        e.stopPropagation();

        if (activeItem === item) {
            setActiveItem(null);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        console.log(e.currentTarget.get)
        console.log(rect)

        setActiveItem(item);
        setPosition({
            x: rect.left + 10,
            y: rect.bottom  // small spacing under element
        });
    };

    useEffect(() => {
        const closePopup = () => setActiveItem(null);
        window.addEventListener("click", closePopup);
        return () => window.removeEventListener("click", closePopup);
    }, []);

    return (
        <section className={listSection}>
            <label className="italic font-bold">
                {isRecipe ? "Ingredients" : `${isProf ? "Components" : "Recipes"}`}
            </label>

            <ul className={getListStyle(style)}>
                {gotList?.length > 0 ? (
                    gotList.map((listItem, i) => (
                        <li key={i} className="flex w-2/3 justify-between">

                            <label
                                className="w-30 cursor-pointer"
                                onClick={(e) => handleClick(e, listItem)}
                            >
                                {listItem.name || listItem.product}
                            </label>

                            {isRecipe && (
                                <>
                                    <label>{listItem.quantity}</label>
                                    <label>{listItem.unit}</label>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <h3 className="italic">No items added</h3>
                )}
            </ul>

            {activeItem && (
                <ItemHoverPopup
                    item={activeItem}
                    position={position}
                    isMobile={isMobile}
                />
            )}
        </section>
    );
}
import { combineProductData } from "../../util/util";
import { listSection, getListStyle } from "./inspectStyles";    

export default function ItemListSection({isRecipe, list, state}){

    const isPreview = state !== undefined;

    const combinedList = (isRecipe && isPreview) && combineProductData(state.validInputs.products, state.validInputs.quantity, state.validInputs.unit);
    const gotList = isPreview ? combinedList : list;

    const style = isRecipe && "ingredients";

    return(
        <section className={listSection}>
            <label>{isRecipe ? "Ingredients" : "Components"}</label>
                <ul className={getListStyle(style)}>
                {gotList.length > 0 ? (gotList.map((listItem, i) => 
                    <li key={i} className="flex w-2/3 justify-between">
                        <label className="w-30">{listItem.name || listItem.product}</label>
                        {isRecipe && (
                            <>
                                <label>{listItem.quantity}</label>
                                <label>{listItem.unit}</label>
                            </>
                        )}
                    </li>)
                ) : (
                    <h3 className="italic">No items added</h3>
                )}
                </ul>
        </section>
    )
}
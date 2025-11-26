import { useContext } from "react";
import { UNITS } from "../../util/constants"
import { getInputStyle, 
        productStyle } from "./productStyles"
import { KitchenContext } from "../../context/KitchenContext";

/**
 * Component for a single product input row.
 * @param {Object} state current form state
 * @param {number} index index of the product in the list
 * @returns component UI for a single product input row
 */
export default function Product({state, index}){

    const validInputs = state.validInputs || {products: [], quantity: [], unit: []};
    const {user} = useContext(KitchenContext);
    
    return(
        <div className={productStyle}>
            <input type="text" name="product" 
                            placeholder="Product" 
                            className={getInputStyle("product")} 
                            defaultValue={validInputs.products[index]}/>
            <input type="number" name="quantity" 
                            placeholder="Quantity" 
                            className={getInputStyle("quantity")} 
                            defaultValue={validInputs.quantity[index]}/>
            <select name="unit" 
                    className={getInputStyle("unit")} 
                    defaultValue={validInputs.unit[index]}>
                <option>Unit</option>
                {UNITS[user.unitType].map((unit) => <option key={unit}>{unit}</option>)}
            </select>
        </div>
    )
}
import { useContext } from "react";
import { UNITS } from "../../util/constants"
import { getInputStyle, 
        productStyle } from "./productStyles"
import { KitchenContext } from "../../context/KitchenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * Component for a single product input row.
 * @param {Object} state current form state
 * @param {number} index index of the product in the list
 * @returns component UI for a single product input row
 */
export default function Product({children, product}){

    const validInputs = product || {product: "", quantity: 0, unit: ""};
    const {user} = useContext(KitchenContext);
    
    return(
        <div className={productStyle}>
            <input type="text" name="product" 
                            placeholder="Product" 
                            className={getInputStyle("product")} 
                            defaultValue={validInputs.product}/>
            <input type="number" name="quantity" 
                            placeholder="Quantity" 
                            className={getInputStyle("quantity")} 
                            defaultValue={validInputs.quantity}/>
            <select name="unit" 
                    className={getInputStyle("unit")} 
                    defaultValue={validInputs.unit}>
                <option>Unit</option>
                {UNITS[user.unitType].map((unit) => <option key={unit}>{unit}</option>)}
            </select>
            {children}
        </div>
    )
}
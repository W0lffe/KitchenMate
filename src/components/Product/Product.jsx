import { units } from "../../util/util"
import { getInputStyle, 
        productStyle } from "./productStyles"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Product({state, index}){
    const {editStatus, deleteProduct} = useContext(KitchenContext);
    
    const isEditingBasket = editStatus.mode === "edit";
    const productName = state?.validInputs?.products[index];

    return(
        <div className={productStyle}>
            <input type="text" name="product" 
                            placeholder="Product" 
                            className={getInputStyle("product")} 
                            defaultValue={state?.validInputs?.products[index]}/>
            <input type="number" name="quantity" 
                            placeholder="Quantity" 
                            className={getInputStyle("quantity")} 
                            defaultValue={state?.validInputs?.quantity[index]}/>
            <select name="unit" 
                            className={getInputStyle("unit")} 
                            defaultValue={state?.validInputs?.unit[index]}>
                <option>Unit</option>
                {units.map((unit) => <option key={unit}>{unit}</option>)}
            </select>
            {isEditingBasket ? (
                <FontAwesomeIcon icon={faTrash} onClick={() => { deleteProduct(productName)}}/>
            ) : null}
        </div>
    )
}
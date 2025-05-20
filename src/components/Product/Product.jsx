import { units } from "../../util/util"
import { getInputStyle, 
        productStyle } from "./productStyles"

export default function Product({state, index}){
    
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
        </div>
    )
}
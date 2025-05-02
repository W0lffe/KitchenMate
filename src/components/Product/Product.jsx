import { units } from "../../util/util"
import { getInputStyle, productStyle } from "./productStyles"

export default function Product(){
    return(
        <div className={productStyle}>
            <input type="text" name="product" placeholder="Product"className={getInputStyle("product")}/>
            <input type="text" name="quantity" placeholder="Quantity" className={getInputStyle("quantity")} />
            <select name="unit" className={getInputStyle("unit")}>
                <option value="unit">Select unit</option>
                {units.map((unit) => <option key={unit}>{unit}</option>)}
            </select>
        </div>
    )
}
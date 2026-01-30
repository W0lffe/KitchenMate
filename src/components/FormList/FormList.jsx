import { useState, useRef, useEffect } from "react"
import Product from "../Product/Product"
import Instruction from "../Instruction/Instruction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {
    lineStyle,
    sectionStyle,
    listStyle,
    addLabelStyle,
    delButtonStyle
} from "./formListStyles";
import { combineProductData } from "../../util/util";


/**
 * FormList component for displaying a list of products or instructions.
 * @param {string} use indicates whether to use the list of ingredients/products or instructions
 * @returns component displaying the list
 */
export default function FormList({ use, state }) {

    const isEditing = use === "Edit";
    const isProduct = ["Edit", "Ingredients", "Items"].includes(use);
    const validInputs = state.validInputs || { products: [], steps: [] };
    const idCounter = useRef(0);

    const emptyItem = () => isProduct ? {
        product: "",
        quantity: null,
        unit: "",
        id: idCounter.current++
    } : {
        id: idCounter.current++,
        step: ""
    };

    const formatList = () => {
        if ((isProduct && validInputs.products.length === 0) ||
            (!isProduct && validInputs.steps.length === 0)) {
            return [emptyItem()];
        }
        else {
            return isProduct
                ? combineProductData(validInputs.products, validInputs.quantity, validInputs.unit)
                    .map(item => ({ ...item, id: idCounter.current++ }))
                : validInputs.steps.map(step => ({ id: idCounter.current++, step }));
        }
    }

    const [list, setList] = useState(() => formatList());

    useEffect(() => {
        setList(formatList());
    }, [state])

    const addItem = () => {
        setList(prev => [...prev, emptyItem()]);
    }

    const removeItem = (id) => {
        setList(
            prev => prev.filter((item) => item.id !== id)
        );
    }

    return (
        <section className={sectionStyle}>
            {(!isEditing && use !== "Items") ?
                <>
                    <span className={lineStyle}>
                        <label>{use}</label>
                    </span>
                </> : null}
            <ul className={listStyle}>
                {(list.map((listItem, i) =>
                    isProduct ?
                        <Product key={listItem.id} product={listItem}>
                            {(list.length > 1 && !isEditing) && <FontAwesomeIcon icon={faTrash} className={delButtonStyle} onClick={() => removeItem(listItem.id)} />}
                        </Product>
                        :
                        <Instruction key={listItem.id} stepNum={`Step ${i + 1}`} step={listItem}>
                            {(list.length > 1 && !isEditing) && <FontAwesomeIcon icon={faTrash} className={delButtonStyle} onClick={() => removeItem(listItem.id)} />}
                        </Instruction>
                ))}
                {!isEditing && 
                    <label className={addLabelStyle} onClick={addItem}>
                        Add {isProduct ? "Ingredient" : "Instruction"}
                        <FontAwesomeIcon icon={faSquarePlus} className="p-0.5 text-xl" />
                    </label>
                }
            </ul>
        </section>
    )
}
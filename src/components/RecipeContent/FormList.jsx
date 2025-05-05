import { useState } from "react"
import Product from "../Product/Product"
import Instruction from "../Instruction/Instruction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, 
        faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { labelStyle, 
        lineStyle, 
        sectionStyle, 
        listStyle } from "./recipeStyles";

export default function FormList({use, state}){

    const [count, setCount] = useState(1)

    const increment = () => {
        setCount(prev => prev +1)
    }

    const decrement = () => {
        setCount(prev => prev -1)
    }

    const isProduct = use === "product";
 
    return(
        <section className={sectionStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>{isProduct ? "Ingredients" : "Instructions"}</label>
                <label>
                    <FontAwesomeIcon icon={faSquarePlus} onClick={increment} />
                </label>
                <label>
                    <FontAwesomeIcon icon={faSquareMinus} onClick={decrement} />
                </label>
            </p>
            <ul className={listStyle}>
                {([...Array(count)].map((_, i) =>
                    isProduct ? 
                            <Product key={i} state={state} index={i}/> 
                            : 
                            <Instruction key={i} step={`Step ${i+1}`} state={state} index={i}/>))}
            </ul>
        </section>
    )
}
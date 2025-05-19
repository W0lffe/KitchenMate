import { useState } from "react"
import Product from "../Product/Product"
import Instruction from "../Instruction/Instruction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, 
        faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { labelStyle, 
        lineStyle, 
        sectionStyle, 
        listStyle } from "./formListStyles";

export default function FormList({use, state}){

    const isProduct = use === "Ingredients" || use === "Items";

    let initialCount = 1;
    if(state.validInputs){
        initialCount = isProduct ? state.validInputs.products.length : state.validInputs.steps.length;
    }

    const [count, setCount] = useState(initialCount)

    const increment = () => {
        setCount(prev => prev +1)
    }

    const decrement = () => {
        setCount(prev => prev -1)
    }

    return(
        <section className={sectionStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>{use}</label>
                <FontAwesomeIcon icon={faSquarePlus} onClick={increment} />
                <FontAwesomeIcon icon={faSquareMinus} onClick={decrement} />
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
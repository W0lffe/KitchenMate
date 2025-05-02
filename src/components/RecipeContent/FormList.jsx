import { useState } from "react"
import Product from "../Product/Product"
import Instruction from "../Instruction/Instruction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { labelStyle, lineStyle, sectionStyle, listStyle } from "./recipeStyles";

export default function FormList({use}){

    const [numberOfProducts, setNumberOfProducts] = useState(1)
    const [numberOfSteps, setNumberOfSteps] = useState(1)

    const handleNewProduct = () => {
        setNumberOfProducts(numberOfProducts + 1)
    }

    const handleNewStep = () => {
        setNumberOfSteps(numberOfSteps + 1)

    }
    
    return(
        <section className={sectionStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>{use === "product" ? "Ingredients" : "Instructions"}</label>
                <label>
                    <FontAwesomeIcon icon={faSquarePlus} 
                                    onClick={use === "product" ? handleNewProduct : handleNewStep} />
                </label>
            </p>
            <ul className={listStyle}>
                {use === "product" ? 
                            ([...Array(numberOfProducts)].map((_, i) => <Product key={i}/>)) : 
                            ([...Array(numberOfSteps)].map((_,i) => <Instruction key={i} step={"Step " + parseInt(i+1)}/>))}
            </ul>
        </section>
    )
}
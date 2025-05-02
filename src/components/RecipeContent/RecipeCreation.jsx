import {inputStyle, 
        labelStyle, 
        lineStyle, 
        sectionStyle, 
        recipeInfoStyle, 
        sectionContainerStyle,
        listStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import SubmitButton from "../Buttons/SubmitButton";
import Instruction from "../Instruction/Instruction";

export default function RecipeCreation(){

    const [numberOfProducts, setNumberOfProducts] = useState(1)
    const [numberOfSteps, setNumberOfSteps] = useState(1)

    const {isMobile} = useContext(KitchenContext)

    const handleNewProduct = () => {
        setNumberOfProducts(numberOfProducts + 1)
    }

    const handleNewStep = () => {
        setNumberOfSteps(numberOfSteps + 1)

    }
    
    return(
       <div className="text-white">
        {isMobile ? <h2 className={mobileHeadingStyle}>NEW RECIPE</h2> : null}
        <form action="">
            <div className={recipeInfoStyle}>
                    <p className={lineStyle}>
                        <label className={labelStyle}>Name:</label>
                        <input type="text" name="name" className={inputStyle}/>
                    </p>
                    <p className={lineStyle}>
                        <label className={labelStyle}>Portions:</label>
                        <input type="text" name="portions" className={inputStyle} />
                    </p>
                    <p className={lineStyle}>
                        <label className={labelStyle}>Prep Time:</label>
                        <input type="text" name="time" className={inputStyle} />
                    </p>
            </div>
            <div className={sectionContainerStyle}>
                <section className={sectionStyle}>
                <p className={lineStyle}>
                    <label className={labelStyle}>Ingredients</label>
                    <label><FontAwesomeIcon icon={faSquarePlus} onClick={handleNewProduct} /></label>
                </p>
                <ul className={listStyle}>
                    {[...Array(numberOfProducts)].map((_, i) => <Product key={i}/>)}
                </ul>
                </section>
                <section className={sectionStyle}>
                <p className={lineStyle}>
                    <label className={labelStyle}>Instructions</label>
                    <label><FontAwesomeIcon icon={faSquarePlus} onClick={handleNewStep}/></label>
                </p>
                <ul className={listStyle}>
                    {[...Array(numberOfSteps)].map((_, i) => <Instruction key={i} step={"Step " + parseInt(i+1)}/>)}
                </ul>
                </section>
            </div>
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
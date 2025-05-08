import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import { bottomSection, 
        containerStyle, 
        getIconStyle, 
        getListStyle, 
        iconSpan, 
        listSection, 
        topSection } from "./inspectStyles";
import SubmitButton from "../Buttons/SubmitButton";

export default function ItemInspectView({itemToInspect}){

    const {activeSection, deleteRecipe, isMobile, setModalState, setActiveRecipe}  = useContext(KitchenContext)

    const mode = itemToInspect.mode;
    const item = mode === "recipes" ? itemToInspect.recipe : itemToInspect.dish;
    const recipe = itemToInspect.recipe;

    const handleDelete = () => {
        deleteRecipe(item.id)
        if(isMobile){
            setModalState(null, false)
        }
    }

    const handleModify = () => {
        console.log(item)
        setActiveRecipe({recipe: item, mode: "edit"})
        if(isMobile){
            setModalState(activeSection, true)
        }
    }

    return(
        <div className={containerStyle}>
            <section className={topSection}>
                <span className={iconSpan}>
                    {isMobile ? <SubmitButton use={"close"} func={() => setModalState(null)}/> : null}
                    <FontAwesomeIcon icon={faTrash} 
                                    className={getIconStyle("del")}
                                    onClick={handleDelete}/>
                    <FontAwesomeIcon icon={faPenToSquare} 
                                    className={getIconStyle()}
                                    onClick={handleModify} />
                </span>
                <h2 className="text-2xl font-semibold italic">{recipe.name}</h2>
                <h3 className="text-lg">Yield: {recipe.output.portions} {recipe.output.output}</h3>
                <h3 className="text-lg">Prep Time: {recipe.prepTime.time} {recipe.prepTime.format}</h3>
            </section>
            <div className={bottomSection}>
                <section className={listSection}>
                    <label>Ingredients</label>
                    <ul className={getListStyle("ingredients")}>
                        {recipe.ingredients.map((ingredient, i) => 
                            <li key={i} className="flex w-2/3 justify-between">
                                <label className="w-30">{ingredient.product}</label>
                                <label>{ingredient.quantity}</label>
                                <label>{ingredient.unit}</label>
                            </li>)}
                    </ul>
                </section>
                <section className={listSection}>
                    <label>Instructions</label>
                    <ul className={getListStyle()}>
                        {recipe.instructions.map((step, i) => 
                            <li key={i}>{`${i+1}. ${step}`}</li>)}
                    </ul>
                </section>
            </div>
        </div>
    )
        
    
}
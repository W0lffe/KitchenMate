import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import RecipeCreation from "./RecipeCreation";
import { getContainerStyle } from "./recipeStyles";

export default function RecipeContent(){

    const {activeRecipe, isMobile} = useContext(KitchenContext)
    const mode = activeRecipe.mode;

    return(
        <div className={getContainerStyle(isMobile)}>
            {mode === "create" ? <RecipeCreation /> : null}
            {mode === "detail" ? <p>RECIPE DEETS</p> : null}
        </div>
    )
}
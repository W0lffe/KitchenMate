import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import RecipeCreation from "./RecipeCreation";
import { getContainerStyle } from "./recipeStyles";

export default function RecipeCreationDetail(){

    const {activeRecipe, isMobile} = useContext(KitchenContext)
    const mode = activeRecipe.mode;

    return(
        <div className={getContainerStyle(isMobile)}>
            {mode === "create" ? <RecipeCreation /> : <p>GAE</p>}
        </div>
    )
}
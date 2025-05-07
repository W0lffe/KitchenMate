import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import RecipeCreation from "./RecipeCreation";
import ItemInspectView from "../ItemInspectView/ItemInspectView";
import { getContainerStyle } from "./recipeStyles";

export default function RecipeContent(){

    const {activeRecipe, isMobile} = useContext(KitchenContext)
    const mode = activeRecipe?.mode;

    return(
        <div className={getContainerStyle(isMobile)}>
            {mode === "create" ? <RecipeCreation /> : null}
            {mode === "edit" ? <RecipeCreation /> : null}
            {mode === "detail" ? <ItemInspectView item={{recipe: activeRecipe.recipe, mode: "recipe"}}/> : null}
        </div>
    )
}
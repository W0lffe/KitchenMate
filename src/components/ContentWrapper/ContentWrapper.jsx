import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import RecipeCreation from "../Recipe/RecipeCreation";
import ItemInspectView from "../ItemInspectView/ItemInspectView";
import {getContainerStyle} from "./wrapperStyles.js"

export default function ContentWrapper(){

    const {activeSection, activeRecipe, isMobile} = useContext(KitchenContext)
    
    let content = null;
    let mode;

    if(activeSection === "recipes"){
        mode = activeRecipe?.mode;
        content = <>
            {mode === "create" ? <RecipeCreation /> : null}
            {mode === "edit" ? <RecipeCreation /> : null}
            {mode === "detail" ? <ItemInspectView item={{recipe: activeRecipe.recipe, mode: "recipe"}}/> : null}

        </>
    }

    return(
            <div className={getContainerStyle(isMobile)}>
               {content}
            </div>
        )
}
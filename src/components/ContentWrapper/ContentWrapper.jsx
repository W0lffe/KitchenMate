import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import RecipeCreation from "../Recipe/RecipeCreation";
import ItemInspectView from "../ItemInspectView/ItemInspectView";
import {getContainerStyle} from "./wrapperStyles.js"

export default function ContentWrapper(){

    const {activeSection, activeRecipe, activeDish, isMobile} = useContext(KitchenContext)
    
    let content = null;
    let mode;

    if(activeSection === "recipes"){
        mode = activeRecipe?.mode;
        content = <>
            {mode === "create" ? <RecipeCreation /> : null}
            {mode === "edit" ? <RecipeCreation /> : null}
            {mode === "detail" ? <ItemInspectView itemToInspect={{recipe: activeRecipe.recipe, mode: activeSection}}/> : null}

        </>
    }

    if(activeSection === "dishes"){
        mode = activeDish?.mode;
        content = <>
            {mode === "create" ? <p>I AM DISH CREATOOOOR</p> : null}
            {mode === "detail" ? <ItemInspectView itemToInspect={{dish: activeDish.dish, mode: activeSection}}/> : null}
        </>
    }

    return(
            <div className={getContainerStyle(isMobile)}>
               {content}
            </div>
        )
}
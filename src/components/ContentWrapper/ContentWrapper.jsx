import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import RecipeCreation from "../Recipe/RecipeCreation";
import DishCreation from "../DishCreation/DishCreation.jsx";
import ItemInspectView from "../ItemInspectView/ItemInspectView";
import BasketEntryList from "../BasketEntryList/BasketEntryList.jsx";
import {getContainerStyle} from "./wrapperStyles.js"

export default function ContentWrapper(){

    const {activeSection, activeRecipe, activeDish, isMobile, editStatus} = useContext(KitchenContext)
    
    let content = null;
    let mode;

    if(activeSection === "recipes"){
        mode = activeRecipe?.mode;
        content = <>
            {mode === "create" || mode === "edit"  ? <RecipeCreation /> : null}
            {mode === "detail" ? <ItemInspectView itemToInspect={{recipe: activeRecipe.recipe, mode: activeSection}}/> : null}

        </>
    }

    if(activeSection === "dishes"){
        mode = activeDish?.mode;
        content = <>
            {mode === "create" ? <DishCreation /> : null}
            {mode === "detail" ? <ItemInspectView itemToInspect={{dish: activeDish.dish, mode: activeSection}}/> : null}
        </>
    }

    if(activeSection === "basket"){
        content = <>
            {editStatus?.status ? <BasketEntryList /> : null}
        </>
    }

    return(
            <div className={getContainerStyle(isMobile)} >
               {content}
            </div>
        )
}
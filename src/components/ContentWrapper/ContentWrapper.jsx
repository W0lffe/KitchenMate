import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import RecipeCreation from "../Recipe/RecipeCreation";
import DishCreation from "../DishCreation/DishCreation.jsx";
import ItemInspectView from "../ItemInspectView/ItemInspectView";
import BasketEntryList from "../BasketEntryList/BasketEntryList.jsx";
import {getContainerStyle} from "./wrapperStyles.js"

export default function ContentWrapper(){

    const {activeSection, activeRecipe, activeDish, isMobile, editStatus} = useContext(KitchenContext)
    
    const mode = activeSection === "recipes" ? activeRecipe?.mode :
                activeSection === "dishes" ? activeDish?.mode :
                undefined;
    const content = renderContent(activeSection, mode, activeDish, activeRecipe, editStatus);

    return(
            <div className={getContainerStyle(isMobile)} >
               {content}
            </div>
        )
}

function renderContent(section, mode, activeDish, activeRecipe, editStatus){
    const modes = ["create", "edit"];
    const isDetail = mode === "detail";

    if(section === "recipes"){

        return(
            <>
                {modes.includes(mode)  && <RecipeCreation />}
                {isDetail && <ItemInspectView itemToInspect={{recipe: activeRecipe?.recipe || null}}/>}
            </>
        )
    }

    if(section === "dishes"){
        return(
            <>
                {modes.includes(mode) && <DishCreation />}
                {isDetail && <ItemInspectView itemToInspect={{dish: activeDish?.dish || null}}/> }
            </>
        )
    }

    if(section === "basket" && editStatus?.status){
        return <BasketEntryList />;
    }
}


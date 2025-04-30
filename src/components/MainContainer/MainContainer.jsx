import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import { useIsMobile } from "../../hooks/useIsMobile"
import RecipeWrapper from "../Recipes/RecipeWrapper"

export default function MainContainer(){

    const {activeSection} = useContext(KitchenContext)

    const isMobile = useIsMobile();

    console.log("mobile:" , isMobile)
  
    return(
        <div className="border border-red-700 w-9/10 lg:w-7/10 h-8/10 lg:h-7/10 fixed top-1/7">
            {activeSection === "recipes" ? <RecipeWrapper isMobile={isMobile}/> : null}
            {activeSection === "dishes" ? <p>RENDER DISHWRAPPER</p> : null}
            {activeSection === "basket" ? <p>RENDER BASKET</p> : null}
        </div>
    )
}
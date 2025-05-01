import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import { useIsMobile } from "../../hooks/useIsMobile"
import RecipeWrapper from "../RecipeWrapper/RecipeWrapper"
import { containerStyle } from "./containerStyles"

export default function MainContainer(){

    const {activeSection} = useContext(KitchenContext)

    const isMobile = useIsMobile();

    console.log("mobile:" , isMobile)
  
    return(
        <>
        {activeSection ? (
            <div className={containerStyle}>
            {activeSection === "recipes" ? <RecipeWrapper isMobile={isMobile}/> : null}
            {activeSection === "dishes" ? <p>RENDER DISHWRAPPER</p> : null}
            {activeSection === "basket" ? <p>RENDER BASKET</p> : null}
        </div>
        ) : null}
        </>
    )
}
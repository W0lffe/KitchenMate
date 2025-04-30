import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import { useIsMobile } from "../../hooks/useIsMobile"
import RecipeWrapper from "../RecipeWrapper/RecipeWrapper"

export default function MainContainer(){

    const {activeSection} = useContext(KitchenContext)

    const isMobile = useIsMobile();

    console.log("mobile:" , isMobile)
  
    return(
        <>
        {activeSection ? (
            <div className="w-9/10 lg:w-7/10 h-8/10 lg:h-7/10 fixed top-1/7 bg-gray-950/70 border border-white/60 rounded-[12px] shadow-2xl shadow-black p-1 lg:p-5">
            {activeSection === "recipes" ? <RecipeWrapper isMobile={isMobile}/> : null}
            {activeSection === "dishes" ? <p>RENDER DISHWRAPPER</p> : null}
            {activeSection === "basket" ? <p>RENDER BASKET</p> : null}
        </div>
        ) : null}
        </>
    )
}
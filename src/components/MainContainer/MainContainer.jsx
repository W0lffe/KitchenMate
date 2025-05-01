import { useContext, useEffect } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import { useIsMobile } from "../../hooks/useIsMobile"
import RecipeWrapper from "../RecipeWrapper/RecipeWrapper"
import { containerStyle } from "./containerStyles"

export default function MainContainer(){

    const {activeSection, setIsMobile} = useContext(KitchenContext)

    const isMobile = useIsMobile();

    useEffect(() => {
        if(isMobile){
            setIsMobile(isMobile)
        }
        console.log("mobile: ", isMobile)
    }, [])

    return(
        <>
        {activeSection ? (
            <div className={containerStyle}>
            {activeSection === "recipes" ? <RecipeWrapper /> : null}
            {activeSection === "dishes" ? <p>RENDER DISHWRAPPER</p> : null}
            {activeSection === "basket" ? <p>RENDER BASKET</p> : null}
        </div>
        ) : null}
        </>
    )
}
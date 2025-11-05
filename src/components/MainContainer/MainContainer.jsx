import { useContext, 
        useEffect } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import { useIsMobile } from "../../hooks/useIsMobile"
import ActiveSectionWrapper from "../ActiveSectionWrapper/ActiveSectionWrapper"
import { containerStyle } from "./containerStyles"

export default function MainContainer(){

    const {activeSection, setIsMobile} = useContext(KitchenContext)

    const isMobile = useIsMobile();

    useEffect(() => {
        if(isMobile){
            setIsMobile(isMobile)
        }
    }, [])

    return(
        <>
        {activeSection ? (
            <div className={containerStyle}>
                <ActiveSectionWrapper /> 
            </div>
        ) : null}
        </>
    )
}
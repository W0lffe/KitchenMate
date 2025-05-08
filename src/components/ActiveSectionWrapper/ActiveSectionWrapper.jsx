import List from "../List/List"
import Toolbar from "../Toolbar/Toolbar"
import { creationHeaderStyle, 
        creationSectionStyle, 
        headingStyle, 
        listSectionStyle, 
        wrapperStyle } from "./wrapperStyles"
import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import ContentWrapper from "../ContentWrapper/ContentWrapper"

export default function ActiveSectionWrapper(){

    const {activeSection, isMobile, activeRecipe, activeDish} = useContext(KitchenContext)

    if(isMobile){
        return <>
            <Toolbar />
            <List />
        </>
    }

    let heading = "";
    let content = null;
    if(activeSection === "recipes" && activeRecipe?.mode){
        content = <ContentWrapper />
        if(activeRecipe.mode === "create"){
            heading = "Recipe Creation";
        }
        if(activeRecipe.mode === "detail"){
            heading = "Recipe Details";
        }
        if(activeRecipe.mode === "edit"){
            heading = "Recipe Editor";
        }
    }
    if(activeSection === "dishes" && activeDish?.mode){
       content = <ContentWrapper />
       if(activeDish.mode === "create"){
            heading = "Dish Creation"
       }
    }

     return (
            <div className={wrapperStyle}>
                <section className={listSectionStyle}>
                    <Toolbar />
                    <List />
                </section>
                <section className={creationSectionStyle}>
                        <header className={creationHeaderStyle}>
                            {content ? <h2 className={headingStyle}>{heading}</h2> : null}
                        </header>
                {content}
                </section>
            </div>
    )
}
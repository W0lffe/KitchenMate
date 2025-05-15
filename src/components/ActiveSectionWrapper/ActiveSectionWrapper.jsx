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

    const {activeSection, isMobile, activeRecipe, activeDish, editStatus} = useContext(KitchenContext)

    if(isMobile){
        return <>
            <Toolbar />
            <List />
        </>
    }

    let heading = "";
    let content;
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
       if(activeDish.mode === "detail"){
            heading = "Dish Details"
       }
    }
    if(activeSection === "basket" && editStatus?.mode){
        content = <ContentWrapper />
        if(editStatus.mode === "add"){
            heading = "Add Items to Basket"
        }
        if(editStatus.mode === "edit"){
            heading = "Edit Basket"
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
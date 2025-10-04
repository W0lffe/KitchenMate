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

    const {activeSection, isMobile, activeRecipe, activeDish, editStatus} = useContext(KitchenContext);

    if(isMobile){
        return <>
            <Toolbar />
            <List />
        </>
    }

    const headings = {
        recipes: {
            create: "Recipe Creation",
            detail: "Recipe Details",
            edit: "Recipe Editor",
        },
        dishes: {
            create: "Dish Creation",
            detail: "Dish Details",
            edit: "Dish Editor",  
        },
        basket: {
            add: "Add Items to Basket",
            edit: "Edit Basket",
        }
    };

    const currentMode = activeSection === "recipes" ? activeRecipe?.mode : 
                        activeSection === "dishes" ? activeDish?.mode : 
                        activeSection === "basket" ? editStatus?.mode :
                        undefined;
                    
    const heading = currentMode && headings[activeSection]?.[currentMode];
    const hasContent = Boolean(currentMode);

     return (
            <div className={wrapperStyle}>
                <section className={listSectionStyle}>
                    <Toolbar />
                    <List />
                </section>
                <section className={creationSectionStyle}>
                        <header className={creationHeaderStyle}>
                            {hasContent && <h2 className={headingStyle}>{heading}</h2>}
                        </header>
                {hasContent && <ContentWrapper />}
                </section>
            </div>
    )
}
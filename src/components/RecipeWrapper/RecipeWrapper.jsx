import List from "../List/List"
import Toolbar from "../Toolbar/Toolbar"
import { creationHeaderStyle, 
        creationSectionStyle, 
        headingStyle, 
        listSectionStyle, 
        wrapperStyle } from "./wrapperStyles"
import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import RecipeContent from "../RecipeContent/RecipeContent"

export default function RecipeWrapper() {

    const {activeRecipe, isMobile, isFetchingData} = useContext(KitchenContext)

    if(isMobile){
        return(
            <>
            <Toolbar />
            {isFetchingData ? <p>FETCHING DATA PLACEHOLDER</p> :  <List />}
            </>
        )
    }

    let heading = "";
    if(activeRecipe){
        if(activeRecipe.mode === "create"){
            heading = "Recipe Creation";
        }
        if(activeRecipe.mode === "detail"){
            heading = "Recipe Details";
        }
    }

    return (
        <div className={wrapperStyle}>
            <section className={listSectionStyle}>
                <Toolbar />
                {isFetchingData ? <p>FETCHING DATA PLACEHOLDER</p> :  <List />}
            </section>
            <section className={creationSectionStyle}>
                    <header className={creationHeaderStyle}>
                        {activeRecipe ? <h2 className={headingStyle}>{heading}</h2> : null}
                    </header>
            {activeRecipe ? <RecipeContent /> : null}
            </section>
        </div>
    )
}
import List from "../List/List"
import { creationHeaderStyle, 
        creationSectionStyle, 
        listHeaderStyle, 
        listSectionStyle, 
        mobileHeaderStyle, 
        wrapperStyle } from "./wrapperStyles"
import { useContext} from "react"
import { KitchenContext } from "../../context/KitchenContext"
import RecipeContent from "../RecipeContent/RecipeContent"


export default function RecipeWrapper() {

    const {activeRecipe, setActiveRecipe, setModalState, isMobile} = useContext(KitchenContext)

    const handleMobileClick = () => {
        setActiveRecipe({recipe: null, mode: "create"})
        setModalState("recipe")
    }

    if(isMobile){
        return(
            <>
            <header className={mobileHeaderStyle}>
                    <p>TOOLBAR FOR FILTERING AND SORTING</p>
                    <button onClick={handleMobileClick}>CREATE NEW</button>
            </header>
            <List />
            </>
        )
    }

    return (
        <div className={wrapperStyle}>
            <section className={listSectionStyle}>
                <header className={listHeaderStyle}>
                    <p>TOOLBAR FOR FILTERING AND SORTING</p>
                    <button onClick={() => setActiveRecipe({recipe: null, mode: "create"})}>CREATE NEW</button>
                </header>
                <List />
            </section>
            <section className={creationSectionStyle}>
                    <header className={creationHeaderStyle}>
                        <p>{(activeRecipe && activeRecipe.mode === "create") ? <h2>Recipe Creation</h2> : <h2>Recipe Details</h2>}</p>
                    </header>
            {activeRecipe ? <RecipeContent /> : null}
            </section>
        </div>
    )
}
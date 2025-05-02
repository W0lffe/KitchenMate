import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import { useContext} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "./FormList";

export default function RecipeCreation(){
    
    const {isMobile} = useContext(KitchenContext)

    return(
       <div className="text-white">
        {isMobile ? <h2 className={mobileHeadingStyle}>NEW RECIPE</h2> : null}
        <form action="">
            <RecipeInfoSection />
            <div className={sectionContainerStyle}>
               <FormList use="product"/>
               <FormList use="instruction"/>
            </div>
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import { useContext, 
        useActionState} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "./FormList";

export default function RecipeCreation(){
    
    const {isMobile} = useContext(KitchenContext)

    const form = (prevFormState, formData) => {
        const name = formData.get("name")
        const portions = formData.get("portions")
        const time = formData.get("time")

        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");
        const steps = formData.getAll("step");
        console.log(products)
        console.log(quantity)
        console.log(unit)
        console.log(steps)

    }

    const [formState, formAction] = useActionState(form , {errors: null})


    return(
       <div className="text-white">
        {isMobile ? <h2 className={mobileHeadingStyle}>NEW RECIPE</h2> : null}
        <form action={formAction}>
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
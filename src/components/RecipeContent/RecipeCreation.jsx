import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import { useContext, 
        useActionState} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { validateRecipeName, 
        validateInteger, 
        validateArrays, 
        combineProductData,
        getTimestamp} from "../../util/util";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "./FormList";

export default function RecipeCreation(){
    
    const {isMobile, addNewRecipe} = useContext(KitchenContext)

    const recipeForm = (prevFormState, formData) => {

        const name = formData.get("name")
        const portions = formData.get("portions")
        const time = formData.get("time")
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");
        const steps = formData.getAll("step");

        console.log(unit)
        let errors = [];

        if(!validateRecipeName(name)){
            errors.push("Recipe name is invalid")
        }

        if(!validateInteger(portions)){
            errors.push("Please enter portion quantity!")
        }

        if(!validateInteger(time)){
            errors.push("Please enter prep time!")
        }

        if(!validateArrays(products)){
            errors.push("Please enter name for product!")
        }

        if(!validateArrays(quantity)){
            errors.push("Please enter quantity for product!")
        }

        if(!validateArrays(unit)){
            errors.push("Please enter unit for product!")
        }

        if(!validateArrays(steps)){
            errors.push("Instruction step cant be empty!")
        }

        let ingredients;
        if(products.length === unit.length && unit.length === quantity.length){
            ingredients = combineProductData(products, quantity, unit)
        }
        else{
            errors.push("Error creating recipe.")
        }

        if(errors.length > 0){
            console.log(errors)
            return {
                errors,
                validInputs: {
                    name,
                    portions,
                    time,
                    products,
                    quantity,
                    unit,
                    steps
                }
            }
        }

        const newRecipe = {
            name,
            portions,
            prepTime: time,
            ingredients,
            steps,
            date: getTimestamp()
        }

        addNewRecipe(newRecipe);

        return {errors: null}
    }

    const [formState, formAction] = useActionState(recipeForm , {errors: null})


    return(
       <div className="text-white">
        {isMobile ? <h2 className={mobileHeadingStyle}>NEW RECIPE</h2> : null}
        <form action={formAction}>
            <RecipeInfoSection state={formState}/>
            <div className={sectionContainerStyle}>
               <FormList use="product" state={formState}/>
               <FormList use="instruction" state={formState}/>
            </div>
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
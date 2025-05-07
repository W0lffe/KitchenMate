import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle, 
        getErrorStyle} from "./recipeStyles";
import { useContext, 
        useActionState} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData,
        getTimestamp} from "../../util/util";
import { validateAll } from "../../util/validation";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "./FormList";

export default function RecipeCreation(){
    
    const {isMobile, addNewRecipe, setModalState} = useContext(KitchenContext)

    const recipeForm = async(prevFormState, formData) => {

        const name = formData.get("name")
        const portions = formData.get("portions")
        const output = formData.get("output")
        const time = formData.get("time")
        const timeFormat = formData.get("timeFormat")
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");
        const steps = formData.getAll("step");

        let errors = validateAll(name, portions, time, 
            timeFormat, products, quantity, unit, steps)

        let ingredients;
        if(products.length === unit.length && unit.length === quantity.length){
            ingredients = combineProductData(products, quantity, unit)
        }
        else{
            errors.push("Error creating recipe.")
        }

        const prepTime = {
            time,
            format: timeFormat
        }

        const portionScale = {
            portions,
            output
        }

        if(errors.length > 0){
            console.log(errors)
            return {
                errors,
                validInputs: {
                    name,
                    portions,
                    output,
                    time,
                    timeFormat,
                    products,
                    quantity,
                    unit,
                    steps
                }
            }
        }

        const newRecipe = {
            name,
            output: portionScale, 
            prepTime,
            ingredients,
            instructions: steps,
            date: getTimestamp()
        }

        await addNewRecipe(newRecipe);
        if(isMobile){
            setModalState(null)
        }

        return {errors: null}
    }

    const [formState, formAction] = useActionState(recipeForm , {errors: null})
    const hasErrors = formState.errors?.length > 0 ? true : false;


    return(
       <div className="text-white">
        {isMobile ? 
            <span className="flex flex-row justify-end items-center px-2">
                <h2 className={mobileHeadingStyle}>NEW RECIPE</h2>
                <SubmitButton use={"close"} func={() => setModalState(null)} />
            </span> : null}
        <form action={formAction}>
            <RecipeInfoSection state={formState}/>
            <ul className={getErrorStyle(hasErrors)}>
                {formState.errors?.map((error, i) => 
                <li key={i}>
                    {error}
                </li>)}
            </ul>
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
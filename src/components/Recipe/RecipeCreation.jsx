import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import { useContext, 
        useActionState,
        useState,
        useEffect} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData,
        getTimestamp} from "../../util/util";
import { validateAll } from "../../util/validation";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "../FormList/FormList";
import Errors from "../Error/Errors"

export default function RecipeCreation(){
    
    const {isMobile, addNewRecipe, setModalState, activeRecipe, updateRecipe} = useContext(KitchenContext)
    const [editingRecipe, setEditingRecipe] = useState(false);
    const recipeToModify = activeRecipe.recipe;
    let modifiedId;
    let isFavorited;

    let initialFormState = {errors: null}

    useEffect(() => {
        if(recipeToModify !== null){
            setEditingRecipe(true);
        }
    }, [recipeToModify])

    if(recipeToModify !== null){
        modifiedId = recipeToModify.id;
        isFavorited = recipeToModify.favorite;
        initialFormState = {
            errors: null,
            validInputs: {
                    name: recipeToModify.name,
                    portions: recipeToModify.output.portions,
                    output: recipeToModify.output.output,
                    time: recipeToModify.prepTime.time,
                    timeFormat: recipeToModify.prepTime.format,
                    products: recipeToModify.ingredients.map(ingredient => ingredient.product),
                    quantity: recipeToModify.ingredients.map(ingredient => ingredient.quantity),
                    unit: recipeToModify.ingredients.map(ingredient => ingredient.unit),
                    steps: recipeToModify.instructions,
            }
        }
    }

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

        if(editingRecipe){
            const updatedRecipe = {...newRecipe, id: modifiedId, favorite: isFavorited};
            console.log("creation",updatedRecipe)
            updateRecipe(updatedRecipe)
        }
        else{
            await addNewRecipe(newRecipe);
        }

        if(isMobile){
            setModalState(null, false)
        }

        return {errors: null}
    }

    const [formState, formAction] = useActionState(recipeForm , initialFormState)
    const mobileHeading = !editingRecipe ? "Recipe Creation" : "Recipe Editor";

    return(
       <div className="text-white">
        {isMobile ? 
            <span className="flex flex-row justify-end items-center px-2">
                <h2 className={mobileHeadingStyle}>{mobileHeading}</h2>
                <SubmitButton use={"close"} func={() => setModalState(null, false)} />
            </span> : null}
        <form action={formAction}>
            <RecipeInfoSection state={formState}/>
            <Errors errors={formState.errors}/>
            <div className={sectionContainerStyle}>
               <FormList use="Ingredients" state={formState}/>
               <FormList use="instructions" state={formState}/>
            </div>
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
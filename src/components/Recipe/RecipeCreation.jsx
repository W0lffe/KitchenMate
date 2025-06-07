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
import toast from "react-hot-toast";

export default function RecipeCreation(){
    
    const {isMobile, handleRequest, setModalState, activeRecipe, setActiveRecipe} = useContext(KitchenContext)
    const [editingRecipe, setEditingRecipe] = useState(false);
    const recipeToModify = activeRecipe.recipe;
    const modifiedId = editingRecipe ? recipeToModify?.id : null;
    const isFavorited = editingRecipe ? recipeToModify?.favorite : false;

    let initialFormState = {errors: null}

    useEffect(() => {
        if(recipeToModify !== null){
            setEditingRecipe(true);
        }
    }, [recipeToModify])

    if(recipeToModify !== null){
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

        const errors = validateAll(name, portions, time, 
            timeFormat, products, quantity, unit, steps)

        const ingredients = combineProductData(products, quantity, unit)

        const prepTime = {
            time,
            format: timeFormat
        }

        const portionScale = {
            portions,
            output
        }

        const validInputs = {
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

        if(errors.length > 0){
            toast.error((t) => (
                <Errors errors={errors}/>
            ), {duration: 5000})
            
            return {
                validInputs
            }
        }

        const newRecipe = {
            name,
            output: portionScale, 
            prepTime,
            ingredients,
            instructions: steps,
            favorite: isFavorited,
            id: modifiedId,
            date: getTimestamp()
        }

        const response = await handleRequest({
            data: newRecipe,
            method: editingRecipe ? "PUT" : "POST"
        })
        const {success, error} = response;
        
        if(error){
            toast.error(error);
            return {
                validInputs
            };
        }
        toast.success(success);

        setTimeout(() => {
            setActiveRecipe(null);
            if(isMobile){
                setModalState(null, false)
            }
        }, 1500);
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
            <div className={sectionContainerStyle}>
               <FormList use="Ingredients" state={formState}/>
               <FormList use="Instructions" state={formState}/>
            </div>
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
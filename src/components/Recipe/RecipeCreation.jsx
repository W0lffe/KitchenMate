import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle} from "./recipeStyles";
import { useContext, 
        useActionState, 
        useState} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData,
        getTimestamp} from "../../util/util";
import { validateAll } from "../../util/validation";
import SubmitButton from "../Buttons/SubmitButton";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "../FormList/FormList";
import Errors from "../Error/Errors"
import toast from "react-hot-toast";
import Tab from "../Tab/Tab";

const getFormValues = (formData) => {
    const name = formData.get("name")
    const portions = formData.get("portions")
    const output = formData.get("output")
    const time = formData.get("time")
    const timeFormat = formData.get("timeFormat")
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");
    const steps = formData.getAll("step");

    return{ name, portions, output, time, timeFormat, 
            products, quantity, unit, steps };
}

export default function RecipeCreation(){
    
    const {isMobile, handleRequest, setModalState, activeRecipe, setActiveRecipe} = useContext(KitchenContext);
    const [openTab, setOpenTab] = useState(isMobile ? "Ingredients" : null);
    
    const [initialState, setInitialState] = useState(()=> {

        const recipeToModify = activeRecipe.recipe;
        const isEditing = activeRecipe.mode === "edit";
        
        const currentState = isEditing ? {
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
            },
            modifiedId: isEditing ? recipeToModify?.id : null,
            isFavorited: isEditing ? recipeToModify?.favorite : false,
            isEditing
        } : { validInputs: null };

        return currentState;
    });

    const recipeForm = async(prevFormState, formData) => {

        let { 
            name, portions, output, time, timeFormat,
            products, quantity, unit, steps 
        } = getFormValues(formData);


        if(openTab === "Ingredients"){
            steps = initialState.validInputs?.steps || [];
        }
        else if(openTab === "Instructions"){
            products = initialState.validInputs?.products || [];
            quantity = initialState.validInputs?.quantity || [];
            unit = initialState.validInputs?.unit || [];
        }

        const errors = validateAll(name, portions, time, 
            timeFormat, products, quantity, unit, steps);

        const ingredients = combineProductData(products, quantity, unit);

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
            output: {
                portions,
                output
            }, 
            prepTime: {
                time,
                format: timeFormat
            },
            ingredients,
            instructions: steps,
            favorite: initialState.isFavorited,
            id: initialState.modifiedId,
            date: getTimestamp()
        }

        const response = await handleRequest({
            data: newRecipe,
            method: initialState.isEditing ? "PUT" : "POST"
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
                setModalState(null, false);
            }
        }, 1250);
        return {validInputs}
    }

    const [formState, formAction] = useActionState(recipeForm , initialState)
    const mobileHeading = !initialState.isEditing ? "Recipe Creation" : "Recipe Editor";

    const handleTabChange = (nextTab) => {
        const formData = new FormData(document.querySelector("form"));
        const { products, quantity, unit, steps } = getFormValues(formData);

        setInitialState({
            ...initialState,
            validInputs: {
                products: products.length > 0 ? products : (initialState.validInputs?.products || []),
                quantity: quantity.length > 0 ? quantity : (initialState.validInputs?.quantity || []),
                unit: unit.length > 0 ? unit : (initialState.validInputs?.unit || []),
                steps: steps.length > 0 ? steps : (initialState.validInputs?.steps || []),
            }
        });

        setOpenTab(nextTab);
    }

    return(
       <div className="text-white">
        {isMobile && (
            <span className="flex flex-row justify-end items-center px-2">
                <h2 className={mobileHeadingStyle}>{mobileHeading}</h2>
                <SubmitButton use={"close"} func={() => setModalState(null, false)} />
            </span>
        )}
        <form action={formAction}>
            <RecipeInfoSection state={formState}/>
            {isMobile ? 
                (
                <div className={sectionContainerStyle}>
                    <div className="flex flex-row gap-5">
                        <button type="button" onClick={() => handleTabChange("Ingredients")}>Ingredients</button>
                        <button type="button" onClick={() => handleTabChange("Instructions")}>Instructions</button>
                    </div>
                    {openTab === "Ingredients" && 
                        <Tab>
                            <FormList use="Ingredients" state={initialState}/>
                        </Tab>
                    }
                    {openTab === "Instructions" && 
                        <Tab>
                            <FormList use="Instructions" state={initialState}/>
                        </Tab>
                    }
                </div>) 
            : 
            (<div className={sectionContainerStyle}>
                <FormList use="Ingredients" state={formState}/>
                <FormList use="Instructions" state={formState}/>
            </div>
            )}
            <footer className={footerStyle}>
                <SubmitButton use={"recipe"}/>
            </footer>
            </form>
        </div>
    )
}
import { sectionContainerStyle,
        mobileHeadingStyle,
        footerStyle,
        mobileHeaderStyle} from "./recipeStyles";
import { useContext, 
        useActionState, 
        useState} from "react";
import { KitchenContext } from "../../context/KitchenContext";
import Button from "../Buttons/Button";
import RecipeInfoSection from "./RecipeInfoSection";
import FormList from "../FormList/FormList";
import { useRecipeForm } from "../../hooks/useRecipeForm";
import { getRecipeFormValues } from "../../util/util";
import ItemInfoSection from "../ItemInspectView/ItemInfoSection";
import ItemListSection from "../ItemInspectView/ItemListSection";
import ItemInstructionSection from "../ItemInspectView/ItemInstructionSection";
import TabButtons from "../Buttons/TabButtons";

/**
 * Sections used in recipe creation form.
 */
const SECTIONS = {
    GENERAL: "General",
    INGREDIENTS: "Ingredients",
    INSTRUCTIONS: "Instructions",
    CONFIRMATION: "Confirmation"
}

/**
 * Component for recipe creation and editing form
 * @returns UI for recipe creation/editing
 */
export default function RecipeCreation(){
    
    const {isMobile, handleRequest, setModalState, activeRecipe, setActiveRecipe, user} = useContext(KitchenContext);
    const [openTab, setOpenTab] = useState(isMobile ? SECTIONS.GENERAL : null);

    const [currentFormValues, setCurrentFormValues] = useState(()=> {

        const recipeToModify = activeRecipe.recipe;
        const isEditing = activeRecipe.mode === "edit";
        
        const currentState = isEditing ? {
            validInputs: {
                    name: recipeToModify.name,
                    portions: recipeToModify.portions,
                    output: recipeToModify.output,
                    outputType: recipeToModify.outputType,
                    time: recipeToModify.time,
                    timeFormat: recipeToModify.timeFormat,
                    products: recipeToModify.ingredients.map(ingredient => ingredient.product),
                    quantity: recipeToModify.ingredients.map(ingredient => ingredient.quantity),
                    unit: recipeToModify.ingredients.map(ingredient => ingredient.unit),
                    steps: recipeToModify.instructions,
                    category: recipeToModify.category
            },
            modifiedId: isEditing ? recipeToModify?.id : null,
            isFavorited: isEditing && recipeToModify?.favorite,
            isEditing
        } : { validInputs: null };

        return currentState;
    });

    const recipeForm = useRecipeForm({
        isMobile,
        currentFormValues,
        handleRequest,
        setActiveRecipe,
        setModalState
    });

    const [formState, formAction] = useActionState(recipeForm , currentFormValues)
    const mobileHeading = !currentFormValues.isEditing ? "Recipe Creation" : "Recipe Editor";

    /**
     * Function to handle tab changes in mobile view
     * @param {string} nextTab tab to switch to
     */
    const handleTabChange = (nextTab) => {
        const formData = new FormData(document.querySelector("form"));

        const { 
            name, portions, output, outputType, time, timeFormat,
            products, quantity, unit, steps, category 
        } = getRecipeFormValues(formData);

        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                name: name === null ? currentFormValues.validInputs?.name : name,
                portions: portions === null ? currentFormValues.validInputs?.portions : portions,
                output: output === null ? currentFormValues.validInputs?.output : output,
                outputType: output === "N/A" ? null : (outputType === null ? currentFormValues.validInputs?.outputType : outputType),
                time: time === null ? currentFormValues.validInputs?.time : time,
                timeFormat: timeFormat === null ? currentFormValues.validInputs?.timeFormat : timeFormat,
                products: products.length > 0 ? products : (currentFormValues.validInputs?.products || []),
                quantity: quantity.length > 0 ? quantity : (currentFormValues.validInputs?.quantity || []),
                unit: unit.length > 0 ? unit : (currentFormValues.validInputs?.unit || []),
                steps: steps.length > 0 ? steps : (currentFormValues.validInputs?.steps || []),
                category: category === null ? currentFormValues.validInputs?.category : category
            }
        });

        setOpenTab(nextTab);
    }

    return(
       <div className="text-white">
        {isMobile && (
            <span className={mobileHeaderStyle}>
                <h2 className={mobileHeadingStyle}>{mobileHeading}</h2>
                <Button use={"close"} />
            </span>
        )}
        <form action={formAction}>
            {isMobile ? 
            (
                <>
                    <TabButtons sections={SECTIONS} openTab={openTab} func={handleTabChange} />
                    <div className={sectionContainerStyle + `${"flex-col"}`}>
                        {openTab === SECTIONS.GENERAL && 
                            <RecipeInfoSection state={currentFormValues} user={user}/>
                        }
                        {openTab === SECTIONS.INGREDIENTS && 
                            <FormList use={SECTIONS.INGREDIENTS} state={currentFormValues}/>
                        }
                        {openTab === SECTIONS.INSTRUCTIONS && 
                            <FormList use={SECTIONS.INSTRUCTIONS} state={currentFormValues}/>
                        }
                        {openTab === SECTIONS.CONFIRMATION && 
                            <>
                                <ItemInfoSection isRecipe={true} state={currentFormValues}/>
                                <ItemListSection isRecipe={true} state={currentFormValues}/>
                                <ItemInstructionSection instructions={currentFormValues.validInputs.steps} />
                            </>
                        }
                    </div>
                </>
            ) : (
                <>
                    <RecipeInfoSection state={formState} user={user}/>
                    <div className={sectionContainerStyle}>
                        <FormList use={SECTIONS.INGREDIENTS} state={formState}/>
                        <FormList use={SECTIONS.INSTRUCTIONS} state={formState}/>
                    </div>
                </>
            )}
            <footer className={footerStyle}>
               {isMobile ? (
                    openTab === SECTIONS.CONFIRMATION && <Button use={"recipe"} /> 
                ) : (
                    <Button use={"recipe"} />
                )}
            </footer>
            </form>
        </div>
    )
}
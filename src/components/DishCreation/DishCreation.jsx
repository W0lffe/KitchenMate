import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import Errors from "../Error/Errors"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle } from "./dishCreationStyles"
import { validateName } from "../../util/validation"
import toast from "react-hot-toast";
import TabButtons from "../Buttons/TabButtons"
import { getRecipeInfo } from "../../util/util"
import ComponentList from "./ComponentList"

const SECTIONS = {
    GENERAL: "General",
    COMPONENTS: "Components",
    CONFIRMATION: "Confirmation"
}

const validateInputs = (inputs) => {

    const {name, course, components} = inputs;
    let errors = [];

    if(!validateName(name)){
            errors.push("Dish name is invalid!");
    }
    if(course === "course"){
            errors.push("Please select a course!");
    }
    if(components.length === 0){
            errors.push("Please add components!");
    }

    return errors;
}

export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, handleRequest, filterList, } = useContext(KitchenContext);
    const [openTab, setOpenTab] = useState(SECTIONS.GENERAL);

    const {mode, dish} = activeDish;
    const isCreatingDish = activeDish?.mode === "create";
    const isEditing = activeDish?.mode === "edit";

    const mobileHeading =  isCreatingDish ? "Dish Creation" : "Dish Editor";

    const [currentFormValues, setCurrentFormValues] = useState(() => {

       const currentState = isEditing ? {
            validInputs: {
                name: dish.name,
                course: dish.course,
                image: dish.image,
                components: dish.components,
                isFavorite: isEditing ? dish.favorite : null,
                modifiedId: isEditing ? dish?.id : null,
            },
            isFavorite: isEditing ? dish.favorite : null,
            modifiedId: isEditing ? dish?.id : null,
            isEditing
       } : {validInputs: null};

       return currentState;
    })
   
    useEffect(() => {
        if(isCreatingDish){
            setCurrentFormValues({
                ...currentFormValues,
                validInputs: {
                    ...currentFormValues.validInputs,
                    components: getRecipeInfo(availableRecipes, dish?.components || [])
                }
            })
        }
        if(isEditing && dish.components){
            setCurrentFormValues({
                ...currentFormValues,
                validInputs: {
                    ...currentFormValues.validInputs,
                    components: getRecipeInfo(availableRecipes, dish.components)
                }
            })
        }
    }, [mode, dish])


    const addComponent = (itemID) => {
        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                ...currentFormValues.validInputs,
                components: [...(currentFormValues.validInputs?.components || []), itemID]
            }
        })
    }

    const deleteComponent = (itemID) => {

        const filtered = [...currentFormValues.validInputs.components].filter((component) => component !== itemID)
        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                ...currentFormValues.validInputs,
                components: filtered
            }
        })
    }

    const updateComponents = (item) => {
        const foundComponent = currentFormValues.validInputs?.components.find(component => component === item) || false;
        foundComponent ? deleteComponent(foundComponent) : addComponent(item);
    }

    const dishForm = async (prevFormState, formData) => {
        const name = formData.get("name");
        const course = formData.get("course");
        const image = formData.get("image");

        const errors = validateInputs({
            name, 
            course, 
            components: currentFormValues.validInputs?.components
        })
        
        const hasImage = image && image.size > 0;

        const validInputs = {
            name,
            course,
            image: hasImage ? image : null
        }
        
        if(errors.length > 0){
            toast.error((t) => (
                <Errors errors={errors}/>
            ), {duration: 5000})
            return {
                validInputs
            }
        }

        const newDish = {
            name,
            course,
            image,
            favorite: currentFormValues.validInputs?.isFavorite || false,
            id: currentFormValues.validInputs?.modifiedId || null,
            components: currentFormValues.validInputs?.components
        }

        const response = await handleRequest({
            data: newDish,
            method: isEditing ? "PUT" : "POST"
        })
        const {error, success} = response;

        if(error){
            toast.error(error);
            return {
                validInputs
            }
        }

        toast.success(success);
        setTimeout(() => {
            setActiveDish(null)
            if(isMobile){
                setModalState(null)
            }
        }, 1250);
        return {validInputs};
    }

    const handleTabChange = (nextTab) => {
        const formData = new FormData(document.querySelector("form"));
        const name = formData.get("name");
        const course = formData.get("course");
        const image = formData.get("image");


        console.log("name", name);

        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                name: name === null ? currentFormValues.validInputs?.name : name
            }
        });

        setOpenTab(nextTab);

        console.log("current form values", currentFormValues);
    }

    const [formState, formAction] = useActionState(dishForm, currentFormValues);

    return(
        <div className="text-white">
           {isMobile &&
                <span className={headerSpanStyle}>
                    <h2 className={`${labelStyle} w-full text-center`}>{mobileHeading}</h2>
                    <SubmitButton use={"close"} func={setModalState} />
                </span> 
            }
            <form action={formAction}>

            {isMobile ? (
                <>
                    <TabButtons sections={SECTIONS} openTab={openTab} func={handleTabChange} />
                    {openTab === SECTIONS.GENERAL && <DishInfoSection state={currentFormValues}/>}
                    {openTab === SECTIONS.COMPONENTS && <ComponentList isMobile={isMobile} isRecipe={true} 
                                                                            list={availableRecipes} func={updateComponents} 
                                                                            filter={filterList}/> }
                    {openTab === SECTIONS.CONFIRMATION && 
                        <div>{currentFormValues.validInputs?.name}</div>
                    }
                </>
            ) : (
                <>
                    <DishInfoSection state={formState}/>
                    <ComponentList list={currentFormValues.validInputs?.components || []} func={deleteComponent}/>
                </>
            )}
            <footer className={footerStyle}>
                {isMobile ? (
                    openTab === SECTIONS.CONFIRMATION && <SubmitButton use={"recipe"} />
                ) : (
                    <SubmitButton use="recipe"/>
                )}
            </footer>
            </form>
        </div>
    )
}


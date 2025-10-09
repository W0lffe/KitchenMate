import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle } from "./dishCreationStyles"
import TabButtons from "../Buttons/TabButtons"
import { getRecipeInfo } from "../../util/util"
import ComponentList from "./ComponentList"
import ItemInfoSection from "../ItemInspectView/ItemInfoSection"
import useDishForm from "../../hooks/useDishForm"

const SECTIONS = {
    GENERAL: "General",
    COMPONENTS: "Components",
    CONFIRMATION: "Confirmation"
}

const getFormDataValues = (formData, state) => {
    const name = formData.get("name");
    const course = formData.get("course");
    const image = formData.get("image");
    const components = state?.validInputs?.components || [];
    return { name, course, image, components };
}

export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, handleRequest, filterList} = useContext(KitchenContext);
    const [openTab, setOpenTab] = useState(SECTIONS.GENERAL);

    const {mode, dish} = activeDish;
    const isCreatingDish = activeDish?.mode === "create";
    const isEditing = activeDish?.mode === "edit";
    const mobileHeading =  isCreatingDish ? "Dish Creation" : "Dish Editor";

    const [componentRecipes, setComponentRecipes] = useState([]);
    const [currentFormValues, setCurrentFormValues] = useState(() => {

       const currentState = isEditing ? {
            validInputs: {
                name: dish.name,
                course: dish.course,
                image: dish.image,
                components: dish.components,
            },
            isFavorite: isEditing ? dish.favorite : null,
            modifiedId: isEditing ? dish?.id : null,
            isEditing
       } : {validInputs: null};

       return currentState;
    })

    useEffect(() => {
        setComponentRecipes(getRecipeInfo(availableRecipes, dish?.components || []))
        
        if(isCreatingDish){
            setCurrentFormValues({
                ...currentFormValues,
                validInputs: {
                    ...currentFormValues.validInputs,
                    components: dish?.components || []
                }
            })
        }
        if(isEditing && dish.components){
            setCurrentFormValues({
                ...currentFormValues,
                validInputs: {
                    ...currentFormValues.validInputs,
                    components: dish.components
                }
            })
        }
    }, [mode, dish])

    const addComponent = (itemID) => {

        setActiveDish({
            dish: {
                ...dish,
                components: [...(dish?.components || []), itemID]
            },
            mode: mode
        })
    }

    const deleteComponent = (itemID) => {
        console.log("deleting component id", itemID);
        const filtered = dish.components.filter((component) => component !== itemID)
        
        setActiveDish({
            dish: {
                ...dish,
                components: filtered
            },
            mode: mode
        })
    }

    const updateComponents = (item) => {
        
        console.log("updating components", item);

        const foundComponent = dish?.components.find((component) => component === item) || false;
        console.log("found component", foundComponent);
        
        if(foundComponent){
            console.log("deleting component", foundComponent);
            deleteComponent(item);
        }
        else{
            console.log("adding component", item);
            addComponent(item);
        }
    }

    const handleTabChange = (nextTab) => {
        const formData = new FormData(document.querySelector("form"));
        const {name, course, image } = getFormDataValues(formData);

        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                name: name === null ? currentFormValues.validInputs?.name : name,
                course: course === null ? currentFormValues.validInputs?.course : course,
                components: currentFormValues.validInputs?.components || [],
            }
        });

        setOpenTab(nextTab);
    }

    const dishForm = useDishForm({
        isMobile, 
        currentFormValues, 
        handleRequest, 
        setActiveDish, 
        setModalState
    });

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
                        <>
                            <ItemInfoSection state={currentFormValues}/>
                            <ComponentList list={componentRecipes} func={deleteComponent}/>
                        </>
                    }
                </>
            ) : (
                <>
                    <DishInfoSection state={formState}/>
                    <ComponentList list={componentRecipes} func={deleteComponent}/>
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


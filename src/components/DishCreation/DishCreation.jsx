import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import Button from "../Buttons/Button"
import DishInfoSection from "./DishInfoSection"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle } from "./dishCreationStyles"
import TabButtons from "../Buttons/TabButtons"
import { getRecipeInfo, 
        getDishFromValues } from "../../util/util"
import ComponentList from "./ComponentList"
import ItemInfoSection from "../ItemInspectView/ItemInfoSection"
import useDishForm from "../../hooks/useDishForm"
import createComponentUpdater from "./dishUtil"
import ItemListSection from "../ItemInspectView/ItemListSection"

/**
 * Section names used by the DishCreation UI.
 */
const SECTIONS = {
    GENERAL: "General",
    COMPONENTS: "Components",
    CONFIRMATION: "Confirmation"
}

/**
 * Dish creation and editing component.
 * @returns dish creation/editing UI component
 */
export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, fullRecipes, setActiveDish, handleRequest, filterList, user} = useContext(KitchenContext);
    const [openTab, setOpenTab] = useState(SECTIONS.GENERAL);

    const {mode, dish} = activeDish;
    const isCreatingDish = activeDish?.mode === "create";
    const isEditing = activeDish?.mode === "edit";
    const mobileHeading =  isCreatingDish ? "Dish Creation" : "Dish Editor";

    const {updateComponents} = createComponentUpdater({dish, mode, setActiveDish});
    const [componentRecipes, setComponentRecipes] = useState([]);
    const [currentFormValues, setCurrentFormValues] = useState(() => {

       const currentState = isEditing ? {
            validInputs: {
                name: dish.name,
                course: dish.course,
                image: dish.image, user,
                components: dish.components,
            },
            isFavorite: isEditing && dish.favorite,
            modifiedId: isEditing && dish?.id,
            isEditing
       } : {validInputs: null};

       return currentState;
    })

    useEffect(() => {
        setComponentRecipes(getRecipeInfo(fullRecipes.current, dish?.components || []))
        
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

    /**
     * Function to handle tab changes in mobile view
     * @param {string} nextTab tab to switch to
     */
    const handleTabChange = (nextTab) => {
        const formData = new FormData(document.querySelector("form"));
        const {name, course, image } = getDishFromValues(formData);

        setCurrentFormValues({
            ...currentFormValues,
            validInputs: {
                name: name === null ? currentFormValues.validInputs?.name : name,
                course: course === null ? currentFormValues.validInputs?.course : course,
                components: currentFormValues.validInputs?.components || [],
                image: (image === null || image.size === 0) ? currentFormValues.validInputs?.image : image
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
                    <h2 className={`${labelStyle} w-full text-center italic`}>{mobileHeading}</h2>
                    <Button use={"close"} />
                </span> 
            }
            <form action={formAction}>

            {isMobile ? (
                <>
                    <TabButtons sections={SECTIONS} openTab={openTab} func={handleTabChange} />
                    {openTab === SECTIONS.GENERAL && <DishInfoSection state={currentFormValues}/>}
                    {openTab === SECTIONS.COMPONENTS && <ComponentList isMobile={isMobile} isRecipe={true} 
                                                                            listToUse={availableRecipes} 
                                                                            isSelected={currentFormValues?.validInputs?.components || []} 
                                                                            handleUpdate={updateComponents} 
                                                                            filter={filterList}/> }
                    {openTab === SECTIONS.CONFIRMATION && 
                        <>
                            <ItemInfoSection state={currentFormValues}/>
                            <ItemListSection list={componentRecipes} />
                        </>
                    }
                </>
            ) : (
                <>
                    <DishInfoSection state={formState}/>
                    <ComponentList listToUse={componentRecipes} />
                </>
            )}
            <footer className={footerStyle}>
                {isMobile ? (
                    openTab === SECTIONS.CONFIRMATION && <Button use={"dish"} />
                ) : (
                    <Button use="dish"/>
                )}
            </footer>
            </form>
        </div>
    )
}


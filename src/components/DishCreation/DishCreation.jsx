import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import Errors from "../Error/Errors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, 
        faTrash } from "@fortawesome/free-solid-svg-icons"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle, 
        listDivStyle, 
        listItemStyle, 
        listSpanStyle, 
        listStyle } from "./dishCreationStyles"
import { validateName } from "../../util/validation"
import toast from "react-hot-toast";

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

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, handleRequest} = useContext(KitchenContext);
    const [components, setComponents] = useState([]);

    const {mode, dish} = activeDish;
    const isCreatingDish = activeDish?.mode === "create";
    const isEditing = activeDish?.mode === "edit";

    const mobileHeading = "Dish Creation";
    const modifiedID = isEditing ? dish.id : null;
    const isFavorite = isEditing ? dish.favorite : null;

    const initialFormState = isEditing ? {
            validInputs: {
                name: dish.name,
                course: dish.course,
                image: dish.image
            }
        } : {validInputs: null}
   
    useEffect(() => {
        if(isCreatingDish){
            setComponents(dish?.components || [])
        }
        if(isEditing && dish.components){
            setComponents(dish.components)
        }
    }, [mode, dish])


    const addComponent = (item) => {
        console.log("added component ", item);
        setActiveDish({
            dish: {
                ...dish,
                components: [...components, item]
            },
            mode: isCreatingDish ? "create" : "edit"
        });
    }

    const deleteComponent = (item) => {
        console.log("deleted component ", item);
        const filtered = [...components].filter((component, componentIndex) => componentIndex !== item)
        setActiveDish({
            dish: {
                ...dish,
                components: filtered
            },
            mode: isCreatingDish ? "create" : "edit"
        });
    }

    const dishForm = async (prevFormState, formData) => {
        const name = formData.get("name");
        const course = formData.get("course");
        const image = formData.get("image");

        const errors = validateInputs({name, course, components})
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
            favorite: isFavorite,
            id: modifiedID,
            components
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

    const [formState, formAction] = useActionState(dishForm, initialFormState);

    return(
        <div className="text-white">
           {isMobile ? 
                       <span className={headerSpanStyle}>
                           <h2 className={`${labelStyle} w-full text-center`}>{mobileHeading}</h2>
                           <SubmitButton use={"close"} func={setModalState} />
                       </span> 
            : null}
            <form action={formAction}>
            <DishInfoSection state={formState}/>
            {isMobile ? <ComponentRecipeList use="recipe" list={availableRecipes} func={addComponent}/> : null}
            <ComponentRecipeList list={components} func={deleteComponent}/>
            <footer className={footerStyle}>
                <SubmitButton use="recipe"/>
            </footer>
            </form>
        </div>
    )
}

function ComponentRecipeList({use, list, func}){

    const isRecipes = use === "recipe";
    const header = isRecipes ? "Add Recipes to Dish" : "Components";
    const fallback = isRecipes ? "Recipe list is empty." : "No components added yet";

    return(
        <div className={listDivStyle}>
                <span className={listSpanStyle}>
                    <label className={labelStyle}>{header}</label>
                <ul className={listStyle}>
                    {list.length === 0 ? <p>{fallback}</p> : null}
                    {isRecipes && list.length > 0 ? 
                        list.map((recipe, i) => 
                        <li key={i} className={listItemStyle}>
                            <label>{recipe.name}</label>
                             <FontAwesomeIcon icon={faSquarePlus}
                                        onClick={() => func(recipe)}/>
                        </li>) 
                    : 
                        list.map((component, i) => 
                        <li key={i} className={listItemStyle}>
                            <label>{component.name}</label>
                            <FontAwesomeIcon icon={faTrash} onClick={() => func(i)}/>
                        </li>)}
                </ul>
                </span>
        </div>
    )
}
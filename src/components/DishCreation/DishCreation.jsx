import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import Errors from "../Error/Errors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle, 
        listDivStyle, 
        listItemStyle, 
        listSpanStyle, 
        listStyle } from "./dishCreationStyles"
import { validateName } from "../../util/validation"

export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, addNewDish, updateDish} = useContext(KitchenContext)
    const [components, setComponents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const isCreatingDish = activeDish?.mode === "create";
    const mobileHeading = "Dish Creation"

    const dishToModify = activeDish.dish;
    const modifiedID = isEditing ? activeDish.dish?.id : null;
    const isFavorite = isEditing ? activeDish.dish?.favorite : null;
    let initialFormState = {errors: null};

    if(dishToModify !== null){
        initialFormState = {
            errors: null,
            validInputs: {
                name: dishToModify.name,
                course: dishToModify.course
            }
        }

        console.log(initialFormState)
    }


    useEffect(() => {
        if(isCreatingDish && activeDish.components){
            setComponents([...activeDish?.components])
        }

        if(dishToModify !== null){
            setIsEditing(true)
            setComponents([...activeDish.dish?.components] || [])
        }
    }, [isCreatingDish, activeDish?.components, dishToModify])

    const addComponent = (item) => {
        setComponents([...components, item])   
    }

    const deleteComponent = (item) => {
        const filtered = [...components].filter((component, i) => i !== item)
        setComponents(filtered);
    }

    const dishForm = (prevFormState, formData) => {
        const name = formData.get("name");
        const course = formData.get("course");
        const image = formData.get("image");

        console.log(name, course, image);

        let errors = [];

        if(!validateName(name)){
            errors.push("Dish name is invalid!");
        }
        if(course === "course"){
            errors.push("Please select a course!");
        }
        if(components.length === 0){
            errors.push("Dish can't be created with zero components!");

        }
        
        if(errors.length > 0){
            return {
                errors,
                validInputs: {
                    name,
                    course,
                    image
                }
            }
        }

        const newDish = {
            name,
            course,
            image,
            favorite: isFavorite ? isFavorite : false,
            components
        }
        if(isEditing){
            const updatedDish = {...newDish, id: modifiedID};
            updateDish(updatedDish);
        }
        else{
            addNewDish(newDish);
        }

        setActiveDish(null)
        if(isMobile){
            setModalState(null)
        }

        return {errors: null};
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
            <Errors errors={formState.errors}/>
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
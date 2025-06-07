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
import toast from "react-hot-toast";

export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, handleRequest} = useContext(KitchenContext);
    const [components, setComponents] = useState([]);
    const [isEditingDish, setIsEditingDish] = useState(false);

    const isCreatingDish = activeDish?.mode === "create";

    const mobileHeading = "Dish Creation";

    const dishToModify = activeDish.dish;
    const modifiedID = isEditingDish ? activeDish.dish?.id : null;
    const isFavorite = isEditingDish ? activeDish.dish?.favorite : null;
    let initialFormState = {errors: null};

    if(dishToModify !== null){
        initialFormState = {
            errors: null,
            validInputs: {
                name: dishToModify.name,
                course: dishToModify.course,
                image: dishToModify.image
            }
        }
    }
   
    useEffect(() => {
        if(isCreatingDish && activeDish.components){
            setComponents([...activeDish?.components])
        }
        if(dishToModify !== null){
            setIsEditingDish(true);
            setComponents([...activeDish.dish?.components] || [])
        }
    }, [isCreatingDish, activeDish?.components, dishToModify])


    const addComponent = (item) => {
        setComponents([...components, item])   
    }

    const deleteComponent = (item) => {
        const filtered = [...components].filter((component, i) => i !== item)
        setComponents(filtered);
        setActiveDish({
            dish: isCreatingDish ? null : {
                ...dishToModify,
                components: filtered
            },
            mode: isCreatingDish ? "create" : "edit"
        })
    }

    const dishForm = async (prevFormState, formData) => {
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
            errors.push("Please add components!");

        }

        const validInputs = {
            name,
            course,
            image
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

        console.log(newDish);

        const response = await handleRequest({
            data: newDish,
            method: isEditingDish ? "PUT" : "POST"
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
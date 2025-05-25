import { useActionState, 
        useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"
import { footerStyle, 
        headerSpanStyle, 
        labelStyle, 
        listDivStyle, 
        listItemStyle, 
        listSpanStyle, 
        listStyle } from "./dishCreationStyles"

export default function DishCreation(){

    const {isMobile, setModalState, activeDish, availableRecipes, setActiveDish, addNewDish} = useContext(KitchenContext)
    const [components, setComponents] = useState([])

    const isCreatingDish = activeDish?.mode === "create";
    const mobileHeading = "Dish Creation"

    useEffect(() => {
        if(isCreatingDish && activeDish.components){
            setComponents([...activeDish?.components])
        }
    }, [isCreatingDish, activeDish?.components])

    const addComponent = (item) => {
        if(isCreatingDish){
                const existingComponents = activeDish?.components || [];
                const components = [...existingComponents, item];
               
                setActiveDish({dish: null, mode: "create", components})
            }
    }

    const dishForm = (prevFormState, formData) => {
        const name = formData.get("name");
        const course = formData.get("course");
        const image = formData.get("image");

        console.log(name, course, image);

        const newDish = {
            name,
            course,
            image,
            favorite: false,
            components
        }

        addNewDish(newDish);

        setActiveDish(null)
        if(isMobile){
            setModalState(null)
        }

    }

    const [formState, formAction] = useActionState(dishForm, {errors: null});

    return(
        <div className="text-white">
           {isMobile ? 
                       <span className={headerSpanStyle}>
                           <h2 className={`${labelStyle} w-full text-center`}>{mobileHeading}</h2>
                           <SubmitButton use={"close"} func={setModalState} />
                       </span> 
            : null}
            <form action={formAction}>
            <DishInfoSection />
            {isMobile ? <ComponentRecipeList use="recipe" list={availableRecipes} func={addComponent}/> : null}
            <ComponentRecipeList list={components}/>
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
                        <li key={i}>{component.name}</li>)}
                </ul>
                </span>
        </div>
    )
}
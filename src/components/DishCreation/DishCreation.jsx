import { useActionState, 
    useContext, 
    useEffect, 
    useState } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"

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
                       <span className="flex flex-row justify-end items-center p-2">
                           <h2 className="w-full text-center">{mobileHeading}</h2>
                           <SubmitButton use={"close"} func={setModalState} />
                       </span> 
            : null}
            <form action={formAction}>
            <DishInfoSection />
            {isMobile ? <div className="flex flex-col list-none w-full max-h-50 h-50 overflow-y-auto gap-1 items-center border-b-gray-400/40 border-b rounded-custom mt-3">
                <label>Add Recipes to Dish</label>
                <span className="flex flex-col gap-2 h-full w-4/6 items-start">
                    {availableRecipes.map((recipe, i) => 
                    <li key={i} className="flex flex-row w-full justify-between">
                        <label>{recipe.name}</label>
                        <FontAwesomeIcon icon={faSquarePlus}
                                        onClick={() => addComponent(recipe)}/>
                    </li>)}
                </span>
                
            </div> : null}
            <div className="flex flex-col list-none w-full max-h-50 h-50 overflow-y-auto gap-1 items-center border-b-gray-400/40 border-b rounded-custom mt-3">
                <label>Components</label>
                <span className="flex flex-col gap-2 h-full w-4/6 items-start">
                    {components.length > 0 ? components.map((component, i) => <li key={i}>{component.name}</li>) 
                    : <p>No components added yet.</p>}
                </span>
            </div>
            <footer className="flex items-center justify-center m-2">
                <SubmitButton use="recipe"/>
            </footer>
            </form>
        </div>
    )
}
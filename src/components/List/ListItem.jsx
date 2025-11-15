import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { getListItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, 
        faSquareCheck, 
        faTrash, 
        faSquarePlus,
        faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import createComponentUpdater from "../DishCreation/dishUtil";
import IconButton from "../Buttons/IconButton";
import { handleToast } from "../../util/toast";


/**
 * Component to display individual list item based on active section inside the simple/categorized list
 * @param {Object} item item to display
 * @returns UI for the list item
 */
export default function ListItem({item}){

    const {setActiveRecipe, setActiveDish, isMobile, setModalState, activeSection, activeDish, handleRequest} = useContext(KitchenContext)

    const {mode, dish} = activeDish || {};
    const {updateComponents} = createComponentUpdater({
        dish, mode, setActiveDish}
    );
  
    const isCreatingDish = activeDish?.mode === "create";
    const isEditingDish = activeDish?.mode === "edit";

    let iconToUse = (isCreatingDish || isEditingDish) ? faSquarePlus :
                        activeSection === "basket" ? faSquareCheck : faEye;
    /**
     * Function to handle deleting an item
     */
    const handleDelete = async () => {
        setModalState({section: activeSection, toDelete: item.id}, true);
    }
    
    /**
     * Function to handle clicks on the list, setting active recipe/dish or toggling basket item obtained state
     */
    const handleClick = async () => {
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});

            if(isMobile){
                setModalState({section: activeSection}, true);
            }
        }
        else if(activeSection === "dishes"){
            if(isCreatingDish || isEditingDish){
                updateComponents(item.id);
            }
            else{
                setActiveDish({dish: item, mode: "detail"});
            }
            if(isMobile){
                setModalState({section: activeSection}, true);
            }
        }
        else if(activeSection === "basket"){
            const newObtained = Number(item.obtained) === 1 ? 0 : 1;
            const updatedItem = {...item, obtained: newObtained};
       
            const response = await handleRequest({
                data: [{
                    ...updatedItem, 
                }],
                method: "PUT"
            });

            const {error} = response;

            handleToast({
                error,
                success: `Product is ${newObtained ? "now" : "no longer"} marked as obtained.`
            })
        }
    }

    /**
     * Function to determine if a recipe is selected as a component in dish creation/editing
     * @param {string} recipeID ID of the recipe to check
     * @returns {boolean} true if the recipe is selected, false otherwise
     */
    const isComponentSelected = (recipeID) => {
        const componentSelected = ["create", "edit"].includes(mode) && activeDish?.dish?.components?.includes(recipeID);
        if(componentSelected){
            iconToUse = faSquareMinus;
        }
        return componentSelected;
    }

    return(
        <li className={getListItemStyle(isMobile, Number(item.obtained) === 1 ? true : false, isComponentSelected(item.id))}>
            {activeSection === "recipes" || (activeSection === "dishes" && (isCreatingDish || isEditingDish)) ? <RecipeItem item={item} isCreatingDish={isCreatingDish || isEditingDish}/> : null}
            {activeSection === "basket" && <BasketItem item={item}/>}
            {(activeSection === "dishes" && (!isCreatingDish && !isEditingDish)) && <DishItem item={item} />}
            <IconButton func={handleClick}>
                 <FontAwesomeIcon icon={iconToUse} 
                                className={` p-3 min-w-10 ${Number(item.obtained) === 1 ? "text-green-600" : " text-[17px]"}`}/>
            </IconButton>
            {activeSection === "basket" && 
                <IconButton func={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            }
        </li>
    )
}
/**
 * Customised list item for recipe type
 * @param {Object} item recipe item
 * @param {boolean} isCreatingDish indicates if a dish is being created 
 * @returns recipe list item
 */
function RecipeItem({item, isCreatingDish}){
    const {name, time, timeFormat} = item;

    return(
        <>
        <label className={listItemNameStyle}>{name}</label>
        {!isCreatingDish && 
            <>
                <label>{time} {timeFormat}</label>
            </>
        }
        </>
    )
}

/**
 * Customised list item for basket type
 * @param {Object} item basket item
 * @returns basket list item
 */
function BasketItem({item}){
    const {product, quantity, unit} = item;

    return(
        <>
        <label className={listItemNameStyle}>{product}</label>
        <label>{quantity}</label>
        <label>{unit}</label>
        </>
    )
}

/**
 * Customised list item for dish type
 * @param {Object} item dish item
 * @returns dish list item
 */
function DishItem({item}){
    const {name, components} = item;

    return(
        <>
        <label className={listItemNameStyle}>{name}</label>
        <label>{components?.length}</label>
        </>
    )
}
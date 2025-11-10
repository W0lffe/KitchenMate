import { useContext, 
        useEffect, 
        useState } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import { bottomSection, 
        containerStyle} from "./inspectStyles";
import ItemInfoSection from "./ItemInfoSection";
import ItemListSection from "./ItemListSection";
import ItemInstructionSection from "./ItemInstructionSection";
import { getRecipeInfo } from "../../util/util";
import ButtonBar from "../Buttons/ButtonBar";
import { handleToast } from "../../util/toast";

/**
 * Derives the view state for the ItemInspectView component.
 * @param {Object} itemToInspect inspectable item (dish or recipe)
 * @param {Object} fullRecipes Reference to full recipes list
 * @returns  View state for the inspect view
 */
const deriveViewState = (itemToInspect, fullRecipes) => {
    const {dish, recipe} = itemToInspect;
    const isRecipe = recipe !== undefined;
    const isDish = dish !== undefined;

    const currentView = {
        item: isRecipe ? recipe : dish,
        list: isRecipe ? recipe.ingredients : getRecipeInfo(fullRecipes.current, dish.components),
        isRecipe,
        isDish,
        isFavorite: isRecipe ? recipe.favorite : dish.favorite,
        isScaled: isRecipe && false
    }

    return currentView;
}


/**
 * Component for inspecting an item (dish or recipe).
 * @param {Object} itemToInspect inspectable item (dish or recipe)
 * @returns UI for inspecting an item
 */
export default function ItemInspectView({itemToInspect}){

    const {activeSection, isMobile, setModalState, setActiveRecipe, handleRequest, setActiveDish, fullRecipes, isFetchingData}  = useContext(KitchenContext);
    const [viewState, setViewState] = useState(deriveViewState(itemToInspect, fullRecipes))
    const [isFavorite, setIsFavorite] = useState(viewState.isFavorite);

    useEffect(() => {
        setViewState(deriveViewState(itemToInspect, fullRecipes))
    }, [itemToInspect])

    //console.log("item to inspect, given parameter", itemToInspect)
    //console.log("item list", viewState.list)
    //console.log("inspectableItem, useState", viewState);
    //console.log("isFavorite", isFavorite);

    /**
     * Handles the deletion of the inspected item.
     */
    const handleDelete = async() => {
        setModalState({section: activeSection, toDelete: viewState.item.id}, true);
    }

    /**
     * Handles the modification of the inspected item.
     */
    const handleModify = () => {
        if(viewState.isRecipe){
            setActiveRecipe({recipe: itemToInspect.recipe, mode: "edit"});
            return;
        }
        if(viewState.isDish){
            setActiveDish({dish: itemToInspect.dish, mode: "edit"});
            return;
        }
        if(isMobile){
            setModalState({section: activeSection}, true);
            return;
        }
    }

    /**
     * Handles adding the inspected item products/ingredients to the cart.
     * @returns only returns if operation fails
     */
    const handleAddCart = async() => {
        if(!viewState.isRecipe){
            setModalState({
                section: activeSection, 
                ingredients: viewState.list.flatMap((component) => component.ingredients)
            }, true)
            return;
        }

        const products = viewState.list;

        const response = await handleRequest({
            data: products,
            method: "POST"
        }, true)
        const {error} = response;

        handleToast({
            error,
            success: "Products added to basket successfully!",
            isMobile,
            setModalState
        })

    }

    /**
     * Handles favoriting/unfavoriting the inspected item.
     */
    const handleFavorite = async() => {

        const newFavoriteValue = !isFavorite;
        setIsFavorite(newFavoriteValue);
        setViewState({
            ...viewState,
            isFavorite: newFavoriteValue
        })

        const item = viewState.isRecipe ? itemToInspect.recipe : itemToInspect.dish;

        const response = await handleRequest({
            method: "PUT",
            data: {...item, 
                    favorite: newFavoriteValue ? 1 : 0
                }
        })

        const {error} = response;

        const object = viewState.isRecipe ? "Recipe" : "Dish";
        handleToast({
            error,
            success: `${object} is ${newFavoriteValue ? "favorited!" : "unfavorited!"}`,
        })

    }

    /**
     * Handles scaling of the inspected item ingredients.
     * @param {Object} scaledIngredients contains scaled ingredients list
     */
    const handleScaling = (scaledIngredients) => {
        setViewState({
            ...viewState,
            item: {
                ...viewState.item,
                ingredients: scaledIngredients,
            },
            list: scaledIngredients,
            isScaled: true
        });
    }

    /**
     * Resets the scaling of the inspected item ingredients.
     */
    const resetScaling = () => {
        setViewState(deriveViewState(itemToInspect, fullRecipes))
    }

    /**
     * Scaling functions to pass as prop to ItemInfoSection component.
     */
    const scalingFunctions = {
        setScaledState: handleScaling, 
        reset: resetScaling, 
        isScaled: viewState.isScaled
    };

    return(
        <div className={containerStyle}>
            <ButtonBar isMobile={isMobile} handleDelete={handleDelete} 
                        handleModify={handleModify} handleAddCart={handleAddCart} 
                        handleFavorite={handleFavorite}
                        fav={isFavorite ? "fav" : ""} fetching={isFetchingData}/>
            <ItemInfoSection isRecipe={viewState.isRecipe} item={viewState.item} scaleFunctions={scalingFunctions} />
            <div className={bottomSection}>
                <ItemListSection isRecipe={viewState.isRecipe} list={viewState.list}/>
                {viewState.isRecipe && <ItemInstructionSection instructions={viewState.item.instructions} />}
            </div>
        </div>
    )
}

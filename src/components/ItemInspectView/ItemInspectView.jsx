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


export default function ItemInspectView({itemToInspect}){

    const {activeSection, isMobile, setModalState, setActiveRecipe, handleRequest, setActiveDish, fullRecipes, isFetchingData}  = useContext(KitchenContext);
    const [viewState, setViewState] = useState(deriveViewState(itemToInspect, fullRecipes))
    const [isFavorite, setIsFavorite] = useState(viewState.isFavorite);

    useEffect(() => {
        setViewState(deriveViewState(itemToInspect, fullRecipes))
    }, [itemToInspect])

    //console.log("item to inspect, given parameter", itemToInspect)
    //console.log("inspectableItem, useState", viewState);
    //console.log("isFavorite", isFavorite);

    const handleDelete = async() => {
        setModalState({section: activeSection, toDelete: viewState.item.id}, true);
    }

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

    const handleAddCart = async() => {
        let products = viewState.list
        if(!viewState.isRecipe){
            products = viewState.list.flatMap((component) => component.ingredients)
        }

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
                    favorite: newFavoriteValue
                }
        })

        const {error} = response;

        const object = viewState.isRecipe ? "Recipe" : "Dish";
        handleToast({
            error,
            success: `${object} is ${newFavoriteValue ? "favorited!" : "unfavorited!"}`,
        })

    }

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

    const resetScaling = () => {
        setViewState(deriveViewState(itemToInspect, fullRecipes))
    }

    return(
        <div className={containerStyle}>
            <ButtonBar isMobile={isMobile} handleDelete={handleDelete} 
                        handleModify={handleModify} handleAddCart={handleAddCart} 
                        handleFavorite={handleFavorite}
                        fav={isFavorite ? "fav" : ""} fetching={isFetchingData}/>
            <ItemInfoSection isRecipe={viewState.isRecipe} item={viewState.item} scaleFunctions={{setScaledState: handleScaling, reset: resetScaling, isScaled: viewState.isScaled}} />
            <div className={bottomSection}>
                <ItemListSection isRecipe={viewState.isRecipe} list={viewState.list}/>
                {viewState.isRecipe && <ItemInstructionSection instructions={viewState.item.instructions} />}
            </div>
        </div>
    )
}

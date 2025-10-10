import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
        faPenToSquare, 
        faStar,
        faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, 
        useEffect, 
        useState } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import { bottomSection, 
        containerStyle, 
        getIconStyle, 
        iconSpan} from "./inspectStyles";
import SubmitButton from "../Buttons/SubmitButton";
import toast from "react-hot-toast";
import { scaleRecipe } from "../../util/util";
import ItemInfoSection from "./ItemInfoSection";
import ItemListSection from "./ItemListSection";
import ItemInstructionSection from "./ItemInstructionSection";
import { getRecipeInfo } from "../../util/util";

const deriveViewState = (itemToInspect, fullRecipes) => {
    const {dish, recipe} = itemToInspect;
    const isRecipe = recipe;
    const isDish = dish;

    const currentView = {
        item: isRecipe ? recipe : dish,
        list: isRecipe ? recipe.ingredients : getRecipeInfo(fullRecipes.current, dish.components),
        isRecipe,
        isDish,
        isFavorite: isRecipe ? recipe.favorite : dish.favorite
    }

    return currentView;
}

export default function ItemInspectView({itemToInspect}){

    const {activeSection, isMobile, setModalState, setActiveRecipe, handleRequest, setActiveDish, fullRecipes}  = useContext(KitchenContext);
    const [viewState, setViewState] = useState(deriveViewState(itemToInspect, fullRecipes))
    const [isFavorite, setIsFavorite] = useState(viewState.isFavorite);

    useEffect(() => {
        setViewState(deriveViewState(itemToInspect, fullRecipes))
    }, [itemToInspect])


    console.log("item to inspect, given parameter", itemToInspect)
    //console.log("inspectableItem, useState", viewState);
    //console.log("isFavorite", isFavorite);

    const handleDelete = async() => {
        const response = await handleRequest({
            data: {id: viewState.item.id},
            method: "DELETE"
        })
        const {error, success} = response;
        if(error){
            toast.error(error);
            return;
        }

        toast.success(success);
        if(isMobile){
            setModalState(null, false)
        }

        setActiveDish(null);
        setActiveRecipe(null);
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
            setModalState(activeSection, true);
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
        const {error, success} = response;

        if(error){
            toast.error(error);
            return;
        }

        toast.success("Products added to basket successfully!");

        if(isMobile){
            setModalState(null, false)
        }
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
        if(error){
            toast.error(error)
            return;
        }
        const object = viewState.isRecipe ? "Recipe" : "Dish";
        toast.success(`${object} is ${newFavoriteValue ? "favorited!" : "unfavorited!"}`);
    }

    const handleScaling = (operation) => {
        const scaledItem = scaleRecipe(operation, viewState.item);
        setViewState({
            ...viewState,
            item: scaledItem,
            list: scaledItem.ingredients
        });
    }

    return(
        <div className={containerStyle}>
            <ButtonBar isMobile={isMobile} handleDelete={handleDelete} 
                        handleModify={handleModify} setModalState={setModalState}
                        handleAddCart={handleAddCart} handleFavorite={handleFavorite}
                        fav={isFavorite ? "fav" : ""}/>
            <ItemInfoSection isRecipe={viewState.isRecipe} item={viewState.item} scale={handleScaling} />
            <div className={bottomSection}>
                <ItemListSection isRecipe={viewState.isRecipe} list={viewState.list}/>

                {viewState.isRecipe && <ItemInstructionSection instructions={viewState.item.instructions} />}
            </div>
        </div>
    )
}

function ButtonBar({isMobile, handleDelete, handleModify, handleFavorite, handleAddCart, setModalState, fav}){

    return(
        <span className={iconSpan}>
                    <FontAwesomeIcon icon={faTrash} 
                                    className={getIconStyle("del")}
                                    onClick={handleDelete}/>
                    <FontAwesomeIcon icon={faPenToSquare} 
                                    className={getIconStyle()}
                                    onClick={handleModify} />
                    <FontAwesomeIcon icon={faStar} 
                                    className={getIconStyle(fav)}
                                    onClick={handleFavorite} />
                    <FontAwesomeIcon icon={faCartPlus} 
                                     className={getIconStyle()}
                                     onClick={handleAddCart} />
                    {isMobile && <SubmitButton use={"close"} func={setModalState}/>}
                </span>
    )
}


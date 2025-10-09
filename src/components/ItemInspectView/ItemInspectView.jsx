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

export default function ItemInspectView({itemToInspect}){

    const {activeSection, isMobile, setModalState, setActiveRecipe, handleRequest, setActiveDish, fullRecipes}  = useContext(KitchenContext);
    const [viewState, setViewState] = useState(() => {

        const {dish, recipe} = itemToInspect;
        const isRecipe = recipe;

        const currentView = {
            item: isRecipe ? recipe : dish,
            list: isRecipe ? recipe.ingredients : getRecipeInfo(fullRecipes.current, dish.components),
            isRecipe
        }

        return currentView;
    })
    
    const [isFavorited, setIsFavorited] = useState(viewState.item.favorite);


    console.log("item to inspect, given parameter", itemToInspect)
    console.log("inspectableItem, useState", viewState);

    const favorited = isFavorited ? "fav" : "";

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
        let products = viewState.item.ingredients
        if(!viewState.isRecipe){
            products = viewState.item.components.flatMap((component) => component.ingredients)
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
        viewState.item.favorite = !viewState.item.favorite;
        setIsFavorited(viewState.item.favorite);

        const item = viewState.isRecipe ? itemToInspect.recipe : itemToInspect.dish;

        const response = await handleRequest({
            method: "PUT",
            data: {...item, 
                    favorite: viewState.item.favorite
                }
        })

        const {error} = response;
        if(error){
            toast.error(error)
            return;
        }
        const object = viewState.isRecipe ? "Recipe" : "Dish";
        toast.success(`${object} is ${viewState.item.favorite ? "favorited!" : "unfavorited!"}`);
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
                        fav={favorited}/>
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


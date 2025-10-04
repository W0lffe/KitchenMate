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

const deriveState = (itemToDerive) => {
    const {mode, dish, recipe} = itemToDerive;
    const isRecipe = mode === "recipes";
    const isDish = mode === "dishes";
    const item = isRecipe ? recipe : dish;
    const listOfItem = isRecipe ? recipe.ingredients : dish.components;

    return {isDish, isRecipe, item, listOfItem}
}

export default function ItemInspectView({itemToInspect}){

    const {activeSection, isMobile, setModalState, setActiveRecipe, handleRequest, setActiveDish}  = useContext(KitchenContext);
    const [inspectableItem, setInspectableItem] = useState(itemToInspect);
    const [inspectingState, setInspectableState] = useState(deriveState(inspectableItem))
    
    const [isFavorited, setIsFavorited] = useState(inspectingState.item.favorite);

    useEffect(() => {
        setInspectableState(deriveState(itemToInspect));
        setInspectableItem(itemToInspect);
    }, [itemToInspect])

    const favorited = isFavorited ? "fav" : "";

    const handleDelete = async() => {
        const response = await handleRequest({
            data: {id: inspectingState.item.id},
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
        if(inspectingState.isRecipe){
            setActiveRecipe({recipe: itemToInspect.recipe, mode: "edit"});
            return;
        }
        if(inspectingState.isDish){
            setActiveDish({dish: itemToInspect.dish, mode: "edit"});
            return;
        }
        if(isMobile){
            setModalState(activeSection, true);
            return;
        }
    }

    const handleAddCart = async() => {
        let products = inspectingState.item.ingredients
        if(!inspectingState.isRecipe){
            products = inspectingState.item.components.flatMap((component) => component.ingredients)
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
        inspectingState.item.favorite = !inspectingState.item.favorite;
        setIsFavorited(inspectingState.item.favorite);

        const item = inspectingState.isRecipe ? itemToInspect.recipe : itemToInspect.dish;

        const response = await handleRequest({
            method: "PUT",
            data: {...item, 
                    favorite: inspectingState.item.favorite
                }
        })

        const {error} = response;
        if(error){
            toast.error(error)
            return;
        }
        const object = inspectingState.isRecipe ? "Recipe" : "Dish";
        toast.success(`${object} is ${inspectingState.item.favorite ? "favorited!" : "unfavorited!"}`);
    }

    const handleScaling = (operation) => {
        const scaledItem = scaleRecipe(operation, inspectableItem);
        setInspectableItem(scaledItem);
        setInspectableState(deriveState(scaledItem));
    }

    return(
        <div className={containerStyle}>
            <ButtonBar isMobile={isMobile} handleDelete={handleDelete} 
                        handleModify={handleModify} setModalState={setModalState}
                        handleAddCart={handleAddCart} handleFavorite={handleFavorite}
                        fav={favorited}/>
            <ItemInfoSection isRecipe={inspectingState.isRecipe} item={inspectingState.item} scale={handleScaling} />
            <div className={bottomSection}>
                <ItemListSection isRecipe={inspectingState.isRecipe} list={inspectingState.listOfItem}/>

                {inspectingState.isRecipe && <ItemInstructionSection instructions={inspectingState.item.instructions} />}
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


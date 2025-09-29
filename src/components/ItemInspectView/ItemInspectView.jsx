import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
        faPenToSquare, 
        faStar,
        faCartPlus,
        faSquareMinus,
        faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, 
        useEffect, 
        useState } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import { bottomSection, 
        containerStyle, 
        getIconStyle, 
        getListStyle, 
        iconSpan, 
        listSection, 
        topSection } from "./inspectStyles";
import SubmitButton from "../Buttons/SubmitButton";
import toast from "react-hot-toast";
import { scaleRecipe } from "../../util/util";

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
                {inspectingState.isRecipe ? (
                    <section className={listSection}>
                    <label>Instructions</label>
                    <ul className={getListStyle()}>
                        {inspectingState.item.instructions.map((step, i) => 
                            <li key={i}>{`${i+1}. ${step}`}</li>)}
                    </ul>
                    </section>
                ) : 
                null}
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

function ItemListSection({isRecipe, list}){

    const style = isRecipe && "ingredients";

    return(
        <section className={listSection}>
            <label>{isRecipe ? "Ingredients" : "Components"}</label>
                <ul className={getListStyle(style)}>
                {list.map((listItem, i) => 
                    <li key={i} className="flex w-2/3 justify-between">
                        <label className="w-30">{listItem.product || listItem.name }</label>
                        {isRecipe ? (
                            <>
                                <label>{listItem.quantity}</label>
                                <label>{listItem.unit}</label>
                            </>
                        ) : null}
                    </li>)}
                 </ul>
        </section>
    )
}

function ItemInfoSection({isRecipe, item, scale}){

    const name = item.name;
    const subtitle = isRecipe ? `Yield: ${item.output.portions} ${item.output.output}` : `Course: ${item.course}`;
    const prepTime = isRecipe ? `Prep Time: ${item.prepTime.time} ${item.prepTime.format}` : null;

    return(
        <div className={topSection}>
            <section className="w-full p-5 lg:p-6">
                <h2 className="text-2xl font-semibold italic">{name}</h2>

                {isRecipe ? (
                    <section className="flex flex-row gap-15">
                        <h3 className="text-lg">{subtitle}</h3>
                        <span className="flex flex-row gap-5 text-xl">
                            <h3>Scale: </h3>
                            <FontAwesomeIcon icon={faSquareMinus} 
                                                className="py-1"
                                                onClick={() => scale("-")}/>
                            <FontAwesomeIcon icon={faSquarePlus} 
                                                className="py-1"
                                                onClick={() => scale("+")}/>
                        </span>
                    </section>) 
                : 
                <h3 className="text-lg">{subtitle}</h3>}

                <h3 className="text-lg">{prepTime}</h3>
            </section>

         

            {!isRecipe ? (
                <section className="w-1/2">
                    <img src={item.image} alt="Photo cant be displayed" className="w-54 rounded-[50px] border-gray-900/80 border-2" />
                </section>
            ) : null}
        </div>
    )
}
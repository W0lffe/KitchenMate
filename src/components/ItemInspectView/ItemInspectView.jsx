import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
        faPenToSquare, 
        faStar,
        faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext"
import { bottomSection, 
        containerStyle, 
        getIconStyle, 
        getListStyle, 
        iconSpan, 
        listSection, 
        topSection } from "./inspectStyles";
import SubmitButton from "../Buttons/SubmitButton";

export default function ItemInspectView({itemToInspect}){

    const {activeSection, deleteRecipe, isMobile, setModalState, setActiveRecipe, deleteDish, setFavorite, addNewProduct}  = useContext(KitchenContext)

    const isRecipe = itemToInspect.mode === "recipes";
    const item = isRecipe ? itemToInspect.recipe : itemToInspect.dish;
    const listOfItem = isRecipe ? itemToInspect.recipe.ingredients : itemToInspect.dish.components;
    const favorited = item.favorite ? "fav" : "";

    const handleDelete = () => {
        if(isRecipe){
            deleteRecipe(item.id)
        }
        else{
            deleteDish(item.id)
        }
        if(isMobile){
            setModalState(null, false)
        }
    }

    const handleModify = () => {
        if(isRecipe){
            setActiveRecipe({recipe: item, mode: "edit"})
        }
        if(isMobile){
            setModalState(activeSection, true)
        }
    }

    const handleAddCart = () => {
        let products = item.ingredients
        if(!isRecipe){
            products = item.components.flatMap((component) => component.ingredients)
        }
        addNewProduct(products);
    }

    const handleFavorite = () => {
        setFavorite(item, isRecipe);
    }

    return(
        <div className={containerStyle}>
            <ButtonBar isMobile={isMobile} handleDelete={handleDelete} 
                        handleModify={handleModify} setModalState={setModalState}
                        handleAddCart={handleAddCart} handleFavorite={handleFavorite}
                        fav={favorited}/>
            <ItemInfoSection isRecipe={isRecipe} item={item} />
            <div className={bottomSection}>
                <ItemListSection isRecipe={isRecipe} list={listOfItem}/>
                {isRecipe ? (
                    <section className={listSection}>
                    <label>Instructions</label>
                    <ul className={getListStyle()}>
                        {item.instructions.map((step, i) => 
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
                    {isMobile ? <SubmitButton use={"close"} func={setModalState}/> : null}
                </span>
    )
}

function ItemListSection({isRecipe, list}){

    const style = isRecipe ? "ingredients" : null;

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

function ItemInfoSection({isRecipe, item}){

    const name = item.name;
    const subtitle = isRecipe ? `Yield: ${item.output.portions} ${item.output.output}` : `Course: ${item.course}`;
    const prepTime = isRecipe ? `Prep Time: ${item.prepTime.time} ${item.prepTime.format}` : null;

    return(
        <div className={topSection}>
            <section className="w-fit lg:w-1/2 p-5 lg:p-8">
                <h2 className="text-2xl font-semibold italic">{name}</h2>
                <h3 className="text-lg">{subtitle}</h3>
                <h3 className="text-lg">{prepTime}</h3>
            </section>
            {!isRecipe ? (
                <section className="w-1/2">
                    <img src={item.image} alt="PHOTO" className="w-54 rounded-[50px] border-gray-900/80 border-2" />
                </section>
            ) : null}
        </div>
    )
}
import { KitchenContext } from "../../context/KitchenContext"
import { useContext, useState, useEffect } from "react"
import { getListItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSquareCheck, faTrash, faSquarePlus } from "@fortawesome/free-solid-svg-icons";


export default function ListItem({item}){

    const {setActiveRecipe, setActiveDish, isMobile, setModalState, activeSection, setProductObtained, deleteProduct, activeDish} = useContext(KitchenContext)
    const [section, setSection] = useState(null);

    useEffect(() => {
        setSection(activeSection)
    },[activeSection])
    
    const isCreatingDish = activeDish?.mode === "create";
    let iconToUse = section === "basket" ? faSquareCheck : faEye;
    iconToUse = isCreatingDish ? faSquarePlus : iconToUse;
   
    const handleClick = () => {
        if(section === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});
        }
        else if(section === "dishes"){
            if(isCreatingDish){
                const existingComponents = activeDish?.components || [];
                const components = [...existingComponents, item];
               
                setActiveDish({dish: null, mode: "create", components})
            }
            else{
                setActiveDish({dish: item, mode: "detail"});
            }
        }
        else if(section === "basket"){
            const updatedItem = {...item, obtained: !item.obtained};
            setProductObtained(updatedItem);
        }

        if(isMobile){
            setModalState(activeSection, true);
        }
    }

    return(
        <li className={getListItemStyle(isMobile, item.obtained ? item.obtained : null)}>
            {section === "recipes" || (section === "dishes" && isCreatingDish) ? <RecipeItem item={item}/> : null}
            {section === "basket" ? <BasketItem item={item}/> : null}
            {(section === "dishes" && !isCreatingDish) ? <DishItem item={item} /> : null}
            <FontAwesomeIcon onClick={handleClick} icon={iconToUse} className={item.obtained ? "text-green-600" : " text-[17px]"}/>
            {section === "basket" ? <FontAwesomeIcon icon={faTrash} onClick={() => { deleteProduct(item.product)}} /> : null}
        </li>
    )
}

function RecipeItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.name}</label>
        <label>{item.output?.portions}</label>
        <label>{item.prepTime?.time} {item.prepTime?.format}</label>
        </>
    )
}

function BasketItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.product}</label>
        <label>{item.quantity}</label>
        <label>{item.unit}</label>
        </>
    )
}

function DishItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.name}</label>
        <label>{item.course}</label>
        <label>{item.components?.length}</label>
        </>
    )
}
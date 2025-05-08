import { KitchenContext } from "../../context/KitchenContext"
import { useContext, useState, useEffect } from "react"
import { listItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function ListItem({item}){

    const {setActiveRecipe, setActiveDish, isMobile, setModalState, activeSection} = useContext(KitchenContext)
    const [section, setSection] = useState(null);

    useEffect(() => {
        setSection(activeSection)
    },[activeSection])

   
    const handleClick = () => {
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});
        }
        else if(activeSection === "dishes"){
            setActiveDish({dish: item, mode: "detail"})
        }
        else if(activeSection === "basket"){
            alert("DELETING ITEM")
        }

        if(isMobile){
            setModalState(activeSection, true);
        }
    }

    return(
        <li className={listItemStyle}>
            {section === "recipes" ? <RecipeItem item={item}/> : null}
            {section === "basket" ? <BasketItem item={item}/> : null}
            {section === "dishes" ? <DishItem item={item}/> : null}
            <button onClick={handleClick}><FontAwesomeIcon icon={faEye}/></button>
        </li>
    )
}

function RecipeItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.name}</label>
        <label>{item.output.portions}</label>
        <label>{item.prepTime.time} {item.prepTime.format}</label>
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
        <label>{item.components.length}</label>
        </>
    )
}
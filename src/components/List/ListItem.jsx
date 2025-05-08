import { KitchenContext } from "../../context/KitchenContext"
import { useContext, useState, useEffect } from "react"
import { listItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function ListItem({item}){

    const {setActiveRecipe, isMobile, setModalState, activeSection} = useContext(KitchenContext)
    const [section, setSection] = useState(null);

    useEffect(() => {
        setSection(activeSection)
    },[activeSection])

   
    const handleClick = () => {
        let section;
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});
            section = "recipe";
        }
        else if(activeSection === "dishes"){
            alert("ADDING RECIPE TO DISH")
        }

        if(isMobile){
            setModalState(section, true);
        }
    }

    return(
        <li className={listItemStyle}>
            {section === "recipes" ? <RecipeItem item={item}/> : null}
            {section === "basket" ? <BasketItem item={item}/> : null}
            {section === "dishes" ? <RecipeItem /> : null}
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
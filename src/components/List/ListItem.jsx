import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { listItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


export default function ListItem({item}){

    const {setActiveRecipe, isMobile, setModalState, activeSection} = useContext(KitchenContext)
   
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
            <label className={listItemNameStyle}>{item.name}</label>
            <label>{item.output.portions}</label>
            <label>{item.prepTime.time} {item.prepTime.format}</label>
            <button onClick={handleClick}><FontAwesomeIcon icon={faEye}/></button>
        </li>
    )
}

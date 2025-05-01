import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { listItemStyle, 
        listItemNameStyle } from "./listStyles"

export default function ListItem({item}){

    const {setActiveRecipe, isMobile, setModalState} = useContext(KitchenContext)

    const handleClick = () => {
        setActiveRecipe({recipe: item, mode: "detail"});
        if(isMobile){
            setModalState("recipe");
        }
    }

    return(
        <li className={listItemStyle}>
            <label className={listItemNameStyle}>{item.name}</label>
            <label>{item.portions}</label>
            <label>{item.prepTime}</label>
            <button onClick={handleClick}>Icon</button>
        </li>
    )
}

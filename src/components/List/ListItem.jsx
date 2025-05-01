import { listItemStyle, 
    listItemNameStyle } from "./listStyles"

export default function ListItem({item, active}){

    return(
        <li className={listItemStyle}>
            <label className={listItemNameStyle}>{item.name}</label>
            <label>{item.portions}</label>
            <label>{item.prepTime}</label>
            <button>Icon</button>
        </li>
    )
}

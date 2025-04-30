
export default function ListItem({item, active}){

    return(
        <li>
            <label>{item.name}</label>
            <label>{item.portions}</label>
            <label>{item.prepTime}</label>
        </li>
    )
}
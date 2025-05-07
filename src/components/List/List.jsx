import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useEffect, 
        useState} from "react"
import { listContainerStyle, 
        listHeadingStyle, 
        itemListStyle, 
        nameHeadingStyle } from "./listStyles";
import ListItem from "./ListItem";

export default function List(){

    const {activeSection, availableRecipes} = useContext(KitchenContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        if(activeSection === "recipes"){
            setList([...availableRecipes])
        }
    }, [availableRecipes])

    console.log(list)

    return(
        <div className={listContainerStyle}>
            <li className={listHeadingStyle}>
                    <label className={nameHeadingStyle}>Name</label>
                    <label>Portions</label>
                    <label>Prep Time</label>
                    <label>View</label>
                </li>
            <ul className={itemListStyle}>
                {list.map((item) => <ListItem key={item.id} item={item}/>)}
            </ul>
        </div>
    )
}
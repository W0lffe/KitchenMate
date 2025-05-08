import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useEffect, 
        useState} from "react"
import { listContainerStyle, 
        listHeadingStyle, 
        itemListStyle, 
        nameHeadingStyle } from "./listStyles";
import ListItem from "./ListItem";
import { basketList } from "../../../backend/dummy_data";

export default function List(){

    const {activeSection, availableRecipes, isFetchingData} = useContext(KitchenContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        if(activeSection === "recipes"){
            setList([...availableRecipes])
        }
        if(activeSection === "dishes"){
            setList([])
        }
        if(activeSection === "basket"){
            setList([...basketList])
        }

    }, [activeSection, availableRecipes])

    if(isFetchingData){
        return(
            <div className={listContainerStyle}>
                <p>Fetching data...</p>
            </div>
        )
    }

    return(
        <div className={listContainerStyle}>
            {list.length > 0 ? 
            (<>
            <li className={listHeadingStyle}>
                <label className={nameHeadingStyle}>Name</label>
                <label>Portions</label>
                <label>Prep Time</label>
                <label>View</label>
            </li>
            <ul className={itemListStyle}>
                {list.map((item) => <ListItem key={item.id} item={item}/>)}
            </ul>
            </>) 
            : 
            (<>
                <p>List is empty! Start by creating {activeSection}.</p>
            </>)}
        </div>
    )
}
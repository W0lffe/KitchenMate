import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useEffect, 
        useState} from "react"
import { listContainerStyle, 
        listHeadingStyle, 
        itemListStyle, 
        nameHeadingStyle } from "./listStyles";
import ListItem from "./ListItem";
import { getListLabels } from "../../util/util";

export default function List(){

    const {activeSection, availableRecipes, availableBasket, availableDishes, isFetchingData} = useContext(KitchenContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        if(activeSection === "recipes"){
            setList([...availableRecipes])
        }
        if(activeSection === "dishes"){
            setList([...availableDishes])
        }
        if(activeSection === "basket"){
            setList([...availableBasket])
        }

        console.log(list)
    }, [activeSection, availableRecipes, availableDishes, availableBasket])

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
                {getListLabels(activeSection).map((label, i) => 
                    <label key={i} className={i === 0 ? nameHeadingStyle : null}>{label}</label>
                )}
            </li>
            <ul className={itemListStyle}>
                {list.map((item, i) => <ListItem key={i} item={item}/>)}
            </ul>
            </>) 
            : 
            (<>
                <p>List is empty! Start by creating {activeSection}.</p>
            </>)}
        </div>
    )
}
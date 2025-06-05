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

    const {activeSection, availableRecipes, availableBasket, availableDishes, isFetchingData, activeDish} = useContext(KitchenContext);
    const [list, setList] = useState([]);
    const [useLabel, setUseLabel] = useState("");

    useEffect(() => {
     
        if(activeSection === "recipes"){
            setUseLabel(activeSection);
            setList([...availableRecipes]);
        }
        else if(activeSection === "dishes"){
            if(activeDish?.mode === "create" || activeDish?.mode === "edit"){
                setUseLabel("recipes");
                setList([...availableRecipes]);
            }
            else{
                setList([...availableDishes]);
                setUseLabel(activeSection);
            }
        }
        else if(activeSection === "basket"){
            setUseLabel(activeSection);
            setList([...availableBasket]);
        }
    }, [activeSection, availableRecipes, availableDishes, availableBasket, activeDish?.mode])

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
                {getListLabels(useLabel).map((label, i) => 
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
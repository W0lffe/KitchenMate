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


const categorize = (itemlist) => {

    const categorized = itemlist.reduce((acc, item) => {
        //console.log("start",acc, "item", item)

        if(!acc[item.category]){
            acc[item.category] = [];
        }

        acc[item.category].push(item);
        //console.log("end",acc, "item", item)

        return acc;
    }, {});
    
    return Object.entries(categorized).map(([category, items]) => ({
        category,
        items
    }))
}


export default function List(){

    const {activeSection, availableRecipes, availableBasket, availableDishes, isFetchingData, activeDish} = useContext(KitchenContext);
    const [list, setList] = useState([]);
    const [useLabel, setUseLabel] = useState("");

    useEffect(() => {

        switch(activeSection){
            case "recipes":
                setUseLabel(1);
                const categorized = categorize(availableRecipes);
                console.log(categorized)
                setList(availableRecipes);
                break;
            case "dishes":
                if(["create", "edit"].includes(activeDish?.mode)){
                    setUseLabel(4);
                    setList(availableRecipes);
                }
                else{
                    setList(availableDishes);
                    setUseLabel(2);
                }
                break;
            case "basket":
                setUseLabel(3);
                setList(availableBasket);
                break;
        }
    }, [activeSection, availableRecipes, availableDishes, availableBasket, activeDish?.mode])

    if(isFetchingData && list.length === 0){
        return(
            <div className={listContainerStyle}>
                <p>Loading {getListLabels(useLabel)}...</p>
            </div>
        )
    }

    return(
        <div className={listContainerStyle}>
            {list.length > 0 ? (
                <>
                    <li className={listHeadingStyle}>
                        {getListLabels(useLabel).map((label, i) => 
                            <label key={i} className={i === 0 ? nameHeadingStyle : null}>{label}</label>
                        )}
                    </li>
                    <ul className={itemListStyle}>
                        {list.map((item, i) => ( <ListItem key={i} item={item}/>))}
                    </ul>
                </>
            ) : (
            <>
                <p>List is empty! Start by creating {activeSection}.</p>
            </>)}
        </div>
    )
}
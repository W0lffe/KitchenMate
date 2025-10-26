import { KitchenContext } from "../../context/KitchenContext"
import {
    useContext,
    useEffect,
    useState
} from "react"
import {listContainerStyle} from "./listStyles";
import CategorizedList from "./CategorizedList";
import SimpleList from "./SimpleList";


const categorize = (itemlist, isRecipe) => {

    const categorized = itemlist.reduce((acc, item) => {
        //console.log("start",acc, "item", item)
        if(isRecipe){
            if (!acc[item.category]) {
                acc[item.category] = [];
            }

            acc[item.category].push(item);
        }
        else{
            if (!acc[item.course]) {
                acc[item.course] = [];
            }

            acc[item.course].push(item);
        }
       
        //console.log("end",acc, "item", item)

        return acc;
    }, {});
    
    if(isRecipe){
        return Object.entries(categorized).map(([category, items]) => ({
            group: category,
            items
        }))
    }
    else{
        return Object.entries(categorized).map(([course, items]) => ({
            group: course,
            items
        }))
    }
}


export default function List() {

    const { activeSection, availableRecipes, availableBasket, availableDishes, isFetchingData, activeDish } = useContext(KitchenContext);
    const [list, setList] = useState([]);
    const [useLabel, setUseLabel] = useState(null);

    useEffect(() => {

        switch (activeSection) {
            case "recipes":
                setUseLabel(1);
                const categorized = categorize(availableRecipes, true);
                //console.log(categorized)
                setList(categorized);
                break;
            case "dishes":
                if (["create", "edit"].includes(activeDish?.mode)) {
                    setUseLabel(4);
                    setList(availableRecipes);
                }
                else {
                    const categorized = categorize(availableDishes, false);
                    //console.log(categorized)
                    setList(categorized);
                    setUseLabel(2);
                }
                break;
            case "basket":
                setUseLabel(3);
                setList(availableBasket);
                break;
        }
    }, [activeSection, availableRecipes, availableDishes, availableBasket, activeDish?.mode])

    if (isFetchingData && list.length === 0) {
        return (
            <div className={listContainerStyle}>
                <p>Loading {activeSection}...</p>
            </div>
        )
    }

    const isCategorized = list.length > 0 && list[0].group !== undefined && list[0].items !== undefined;

    return (
        <div className={listContainerStyle}>
            {list.length > 0 ? (
                isCategorized ? (
                    list.map((group, i) => (
                    <CategorizedList group={group} key={i} useLabel={useLabel} />
                ))
                ) : (
                    <SimpleList list={list} useLabel={useLabel}/>
                )
            ) : (
                <p>List is empty! Start by creating a {activeSection}.</p>
            )}
        </div >
    )
}
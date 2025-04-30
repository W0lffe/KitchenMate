import { KitchenContext } from "../../context/KitchenContext"
import { useContext, useEffect, useState } from "react"
import { recipeList } from "../../../backend/dummy_data"
import ListItem from "./ListItem";

export default function List(){

    const {activeSection} = useContext(KitchenContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        if(activeSection === "recipes"){
            setList([...recipeList])
        }
    }, [activeSection])

    console.log(list)

    return(
        <div className="w-full h-9/10 border border-red-700">
            <ul className="w-full h-full flex flex-col justify-start items-center">
                <li>
                    <label>Name</label>
                    <label>Portions</label>
                    <label>Prep Time</label>
                </li>
                {list.map((item) => <ListItem key={item.id} item={item} active={activeSection} />)}
            </ul>
        </div>
    )
}
import { KitchenContext } from "../../context/KitchenContext"
import { useContext, useEffect, useState } from "react"
import { recipeList } from "../../../backend/dummy_data"
import ListItem from "./ListItem";

export default function List(){

    const {activeSection} = useContext(KitchenContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        if(activeSection === "recipes"){
            setList([...recipeList, ...recipeList, ...recipeList, ...recipeList])
        }
    }, [activeSection])

    console.log(list)

    return(
        <div className="w-full h-9/10 border border-white/40 flex flex-col justify-start items-center rounded-[12px]">
            <li className="h-10 w-9/10 flex justify-between items-center p-2 lg:p-5 font-medium ">
                    <label className="w-15 lg:w-45">Name</label>
                    <label>Portions</label>
                    <label>Prep Time</label>
                    <label>View</label>
                </li>
            <ul className="w-full h-max-8/10 flex flex-col justify-start items-center overflow-y-auto">
                {list.map((item) => <ListItem key={item.id} item={item} active={activeSection} />)}
            </ul>
        </div>
    )
}
import { mobileToolbarStyle, 
        toolbarStyle } from "./toolbarStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { getToolbarLabels } from "../../util/util";

export default function Toolbar(){

    const {isMobile, setActiveRecipe, setModalState} = useContext(KitchenContext)

    let style = toolbarStyle;
    let func = () => { setActiveRecipe({recipe: null, mode: "create"}) };

    const handleMobileClick = () => {
        setActiveRecipe({recipe: null, mode: "create"})
        setModalState("recipe")
    }

    if(isMobile){
        style = mobileToolbarStyle;
        func = handleMobileClick;
    }
  
    return(
        <header className={style}>
            <h3 className="text-md lg:text-xl italic">Search and Filter</h3>
            <span className="flex flex-row gap-1 lg:gap-15 items-center">
                <input type="text" name="name" placeholder="Search..." className="border border-white w-30"/>
                <p>Sort By:</p>
                {getToolbarLabels(isMobile).map((item) => <label>{item}</label>)}
            </span>
            <button onClick={func}>CREATE NEW</button>
        </header>
    )
}
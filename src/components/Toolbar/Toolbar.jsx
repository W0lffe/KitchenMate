import { headingStyle, 
        iconStyle, 
        inputStyle, 
        mobileToolbarStyle, 
        spanStyle, 
        toolbarStyle } from "./toolbarStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { sortOptions } from "./sortOptions";

export default function Toolbar(){

    const {isMobile, setActiveRecipe, setActiveDish, setModalState, filterList, sortList, activeSection, setEntryStatus} = useContext(KitchenContext)

    const currentOptions = sortOptions[activeSection === "basket" ? "basket" : "other"];
    const labels = !isMobile ? currentOptions.labels : 
                                currentOptions.icons.map((icon, i) => <FontAwesomeIcon icon={icon} key={i} className={iconStyle}/>)
    
    const sortValues = currentOptions.values;
    let style = toolbarStyle;
    
    let func;
    if(activeSection === "recipes"){
        func = () => { setActiveRecipe({recipe: null, mode: "create"}) };
    }
    if(activeSection === "dishes"){
        func = () => { setActiveDish({dish: null, mode: "create"}) };
    }
    if(activeSection === "basket"){
        func = () => { setEntryStatus(true) };
    }   
   

    const handleMobileClick = () => {
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: null, mode: "create"})
        }
        if(activeSection === "dishes"){
            setActiveDish({dish: null, mode: "create"})
        }
        if(activeSection === "basket"){
            setEntryStatus(true);
        }   

        setModalState(activeSection, true)
    }

    if(isMobile){
        style = mobileToolbarStyle;
        func = handleMobileClick;
    }
  
    return(
        <header className={style}>
            <h3 className={headingStyle}>Search and Filter</h3>
            <input type="text" name="name" 
                            placeholder="Search..." 
                            className={inputStyle} 
                            onChange={(event) => filterList(event.target.value)}/>
            <span className={spanStyle}>
                {labels.map((item, i) => <label key={i} onClick={() => sortList(sortValues[i])}>{item}</label>)}
                <FontAwesomeIcon icon={faFolderPlus} 
                                onClick={func} 
                                className={iconStyle}/>
            </span>
        </header>
    )
}
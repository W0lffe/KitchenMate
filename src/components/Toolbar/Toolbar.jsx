import { headingStyle, 
        iconStyle, 
        inputStyle, 
        mobileToolbarStyle, 
        spanStyle, 
        toolbarStyle } from "./toolbarStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, 
        faClock, 
        faCalendarDays, 
        faStar,
        faFolderPlus } from "@fortawesome/free-solid-svg-icons";

export default function Toolbar(){

    const {isMobile, setActiveRecipe, setActiveDish, setModalState, filterRecipes, sortRecipes, activeSection, setEntryStatus} = useContext(KitchenContext)

    const labelArray = activeSection === "basket" ? ["Name", "Quantity", "Obtained"] : 
                                        ["Name", "Prep Time", "Newest-Oldest", "Favorite"];

    const labels = !isMobile ? labelArray :
    [
    <FontAwesomeIcon icon={faArrowDownAZ} className={iconStyle}/>,
    <FontAwesomeIcon icon={faClock} className={iconStyle}/>,
    <FontAwesomeIcon icon={faCalendarDays} className={iconStyle}/>,
    <FontAwesomeIcon icon={faStar} className={iconStyle}/>,
    ];
    const sortValues = ["name", "time", "date", "fav"];

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
                            onChange={(event) => filterRecipes(event.target.value)}/>
            <span className={spanStyle}>
                {labels.map((item, i) => <label key={i} onClick={() => sortRecipes(sortValues[i])}>{item}</label>)}
                <FontAwesomeIcon icon={faFolderPlus} 
                                onClick={func} 
                                className={iconStyle}/>
            </span>
        </header>
    )
}
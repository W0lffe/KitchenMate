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

    const {isMobile, setActiveRecipe, setModalState, filterRecipes, sortRecipes} = useContext(KitchenContext)

    const labels = !isMobile ? ["Name", "Prep Time", "Newest-Oldest", "Favorite"] :
    [
    <FontAwesomeIcon icon={faArrowDownAZ} className={iconStyle}/>,
    <FontAwesomeIcon icon={faClock} className={iconStyle}/>,
    <FontAwesomeIcon icon={faCalendarDays} className={iconStyle}/>,
    <FontAwesomeIcon icon={faStar} className={iconStyle}/>,
    ];
    const sortValues = ["name", "time", "date", "favorite"];

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
            <h3 className={headingStyle}>Search and Filter</h3>
            <input type="text" name="name" 
                            placeholder="Search..." 
                            className={inputStyle} 
                            onChange={(event) => filterRecipes(event.target.value)}/>
            <span className={spanStyle}>
                {labels.map((item, i) => <label onClick={() => sortRecipes(sortValues[i])}>{item}</label>)}
                <FontAwesomeIcon icon={faFolderPlus} 
                                onClick={func} 
                                className={iconStyle}/>
            </span>
        </header>
    )
}
import { headingStyle, 
        iconStyle, 
        inputStyle, 
        mobileToolbarStyle, 
        spanStyle, 
        toolbarStyle } from "./toolbarStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, 
        faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getSortOptions } from "./sortOptions";

export default function Toolbar(){

    const {isMobile, setActiveRecipe, setActiveDish, setModalState, filterList, sortList, activeSection, setEntryStatus, activeDish} = useContext(KitchenContext)

    const isCreatingDish = activeDish?.mode === "create";
    const currentOptions = getSortOptions(activeSection, isCreatingDish);
    const labels = !isMobile ? currentOptions.labels : 
                                currentOptions.icons.map((icon, i) => <FontAwesomeIcon icon={icon} key={i} className={iconStyle}/>)
    
    const sortValues = currentOptions.values;
    const style = isMobile ? mobileToolbarStyle : toolbarStyle;
    
    const initCreatingMode = ()=> {
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: null, mode: "create"});
            return;
        }
        else if(activeSection === "dishes"){
            setActiveDish({dish: null, mode: "create"});
            return;
        }
        else if(activeSection === "basket"){
            setEntryStatus({status: true, mode: "add"});
            return;
        }   
    }

    const handleMobileClick = () => {
        initCreatingMode();
        setModalState(activeSection, true)
    }

    const clickHandler = isMobile ? handleMobileClick : initCreatingMode;

    const handleBasketEdit = () => {
        setEntryStatus({status: true, mode: "edit"});
        if(isMobile){
            setModalState(activeSection, true)
        }
    }
   
    return(
        <header className={style}>
            <h3 className={headingStyle}>Search and Filter</h3>
            <input type="text" 
                        name="name" 
                        placeholder="Search..." 
                        className={inputStyle} 
                        onChange={(event) => filterList(event.target.value)}/>
            <span className={spanStyle}>
                {labels.map((item, i) => <label key={i} onClick={() => sortList(sortValues[i])}>{item}</label>)}
                <FontAwesomeIcon icon={faFolderPlus} 
                                onClick={clickHandler} 
                                className={iconStyle}/>
                {activeSection === "basket" && (
                    <FontAwesomeIcon icon={faPenToSquare} 
                        onClick={handleBasketEdit} 
                        className={iconStyle}/>
                )}
            </span>
        </header>
    )
}
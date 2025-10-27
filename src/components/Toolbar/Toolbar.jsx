import { headingStyle, 
        iconStyle, 
        mobileToolbarStyle, 
        spanStyle, 
        toolbarStyle } from "./toolbarStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, 
        faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getSortOptions } from "./sortOptions";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import { handleToast } from "../../util/toast";

export default function Toolbar(){

    const {isMobile, setActiveRecipe, setActiveDish, 
            setModalState, filterList, sortList, 
            activeSection, setEntryStatus, activeDish, 
            fullBasket} = useContext(KitchenContext)

    const isCreatingDish = activeDish?.mode === "create";
    const currentOptions = getSortOptions(activeSection, isCreatingDish);
    const labels = !isMobile ? currentOptions.labels : 
                                currentOptions.icons.map((icon, i) => <FontAwesomeIcon icon={icon} key={i} className={iconStyle}/>)
    
    const sortValues = currentOptions.values;
    const style = isMobile ? mobileToolbarStyle : toolbarStyle;

    const basket = fullBasket.current;
    
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
        setModalState({section: activeSection}, true)
    }

    const clickHandler = isMobile ? handleMobileClick : initCreatingMode;

    const handleBasketEdit = () => {
        if(basket.length === 0){
            handleToast({
                error: "Can't edit empty basket!"
            })
            return;
        }

        setEntryStatus({status: true, mode: "edit"});
        if(isMobile){
            setModalState({section: activeSection}, true)
        }
    }

    const handleClearBasket = async() => {

        if(basket.length === 0){
            handleToast({
                error: "Basket is empty!"
            })
            return;
        }
        setModalState({section: activeSection, toDelete: basket}, true);
    }
   
    return(
        <header className={style}>
            <h3 className={headingStyle}>Search and Filter</h3>
            <span className={spanStyle}>
                <SearchBar filter={filterList} />
                {activeSection === "basket" && 
                <>
                    <button type="button"
                        className="border p-1 rounded-custom-low bg-gray-500/70 shadow-md 
                            shadow-black hover:bg-custom-bggray hover:animate-pulse"
                            onClick={handleClearBasket}>Clear List</button>
                </>}
            </span>
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
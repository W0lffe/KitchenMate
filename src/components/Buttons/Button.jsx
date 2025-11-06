import { useFormStatus } from "react-dom";
import { getSubmitButtonStyle } from "./buttonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";


/**
 * Button component used for form submission and modal closing
 * @param {string} use defines the button use case, either "close" or "submit", also gets the appropriate style
 * @returns button component with desired use
 */
export default function Button({use}){

    const {setActiveDish, setActiveRecipe, setEntryStatus, setModalState} = useContext(KitchenContext)
    const {pending} = useFormStatus()
    
    /**
     * Handles click event for closing button
     */
    const handleClosingClick = () =>{
        setActiveDish(null);
        setActiveRecipe(null);
        setEntryStatus(null);
        setModalState(null, false)
    }

    if(use === "close"){
        return(
            <FontAwesomeIcon icon={faXmark} 
                            onClick={handleClosingClick} 
                            className={getSubmitButtonStyle(use)}/>
        )
    }

    return(
        <button type="submit" 
                disabled={pending}
                className={getSubmitButtonStyle(use)}>{pending ? "Submitting..." : "Confirm"}
        </button>
    )
}
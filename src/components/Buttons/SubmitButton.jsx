import { useFormStatus } from "react-dom";
import { getSubmitButtonStyle } from "./buttonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";

export default function SubmitButton({use, func}){

    const {setActiveDish, setActiveRecipe, setEntryStatus} = useContext(KitchenContext)
    const {pending} = useFormStatus()
    
    const handleClosingClick = () =>{
        setActiveDish(null);
        setActiveRecipe(null);
        setEntryStatus(null);
        func(null, false)
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
        className={getSubmitButtonStyle(use)}>{pending ? "Submitting..." : "Submit"}</button>
    )
}
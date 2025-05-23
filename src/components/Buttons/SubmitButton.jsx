import { useFormStatus } from "react-dom";
import { getSubmitButtonStyle } from "./buttonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SubmitButton({use, func}){
    const {pending} = useFormStatus()

    if(use === "close"){
        return(
            <FontAwesomeIcon icon={faXmark} 
                            onClick={() => func(null, false)} 
                            className={getSubmitButtonStyle(use)}/>
        )
    }

    return(
        <button type="submit" 
        disabled={pending}
        className={getSubmitButtonStyle(use)}>{pending ? "Submitting..." : "Submit"}</button>
    )
}
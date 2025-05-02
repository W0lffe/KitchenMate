import { useFormStatus } from "react-dom";
import { getSubmitButtonStyle } from "./buttonStyles";

export default function SubmitButton({use}){
    const {pending} = useFormStatus()

    return(
        <button type="submit" 
        disabled={pending}
        className={getSubmitButtonStyle(use)}>{pending ? "Submitting..." : "Submit"}</button>
    )
}
import { useFormStatus } from "react-dom";
import { submitButtonStyle } from "./buttonStyles";

export default function SubmitButton(){
    const {pending} = useFormStatus()

    return(
        <button type="submit" 
        disabled={pending}
        className={submitButtonStyle}>{pending ? "Submitting..." : "Submit"}</button>
    )
}
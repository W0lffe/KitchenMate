import { getErrorStyle } from "./errorStyle";
import toast from "react-hot-toast";


/**
 * Handles errors by displaying them in a toast notification.
 * @param {Array} errors Array of error messages to display
 */
export default function handleErrorsToast(errors){

    if(Array.isArray(errors)){
        toast.error((t) => (
                <Errors errors={errors} />
        ), {duration: 5000});
    }
}

/**
 * Component to display a list of error messages.
 * @param {Array} errors Array of error messages to display 
 * @returns component displaying the errors
 */
export function Errors({errors}){

    const hasErrors = errors?.length > 0 ? true : false;

    return(
        <ul className={getErrorStyle(hasErrors)}>
            {errors?.length > 0 && errors.map((error, i) => 
                <li key={i}>{error}</li>
            )}
        </ul>
    )
}
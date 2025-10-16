import { getErrorStyle } from "./errorStyle";
import toast from "react-hot-toast";

export default function handleErrorsToast(errors){

    if(Array.isArray(errors)){
        toast.error((t) => (
                <Errors errors={errors} />
        ), {duration: 5000});
    }
}

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
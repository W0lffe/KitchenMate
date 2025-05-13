import { getErrorStyle } from "./errorStyle";
export default function Error({errors}){

    const hasErrors = errors?.length > 0 ? true : false;

    return(
        <ul className={getErrorStyle(hasErrors)}>
                    {errors?.map((error, i) => 
                        <li key={i}>{error}</li>
                    )}
        </ul>
    )
}
import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"

/**
 * Icon button component for item action buttons
 * @param {JSX} children icon component to render inside button
 * @param {function} func function to execute on button click 
 * @returns 
 */
export default function IconButton({children, func}){

    const {isFetchingData} = useContext(KitchenContext)

    return(
        <button disabled={isFetchingData} type="button" onClick={func}>
            {children}
        </button>
    )
}
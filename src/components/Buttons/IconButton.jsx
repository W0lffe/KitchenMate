import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"

export default function IconButton({children, func}){

    const {isFetchingData} = useContext(KitchenContext)

    return(
        <button disabled={isFetchingData} onClick={func}>
            {children}
        </button>
    )
}
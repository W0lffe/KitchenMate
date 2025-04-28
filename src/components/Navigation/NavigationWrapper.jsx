import { getWrapperStyle } from "./navigationStyles";
import Navigation from "./Navigation";
import { KitchenContext } from "../../context/KitchenContext";
import { useContext } from "react";

export default function NavigationWrapper(){

    const {navigationIsOpen} = useContext(KitchenContext)
    return(
        <div className={getWrapperStyle(navigationIsOpen)}>
            <Navigation />
        </div>
    )
}
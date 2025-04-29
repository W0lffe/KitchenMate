import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen,
    faUtensils,
    faClipboardList,
    } from "@fortawesome/free-solid-svg-icons";
import { getSectionStyle, 
    headingStyle } from "./navigationStyles";
import { useContext } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import NaviButton from "../Buttons/NaviButton";


export default function NaviSection(){

    const {navigationIsOpen, setActiveSection} = useContext(KitchenContext)

    return(
         <section className={getSectionStyle(navigationIsOpen)}>
            <h4 className={headingStyle}>Navigation</h4>
            <NaviButton func={setActiveSection} value={"recipes"}>Recipe Management <FontAwesomeIcon icon={faBookOpen} className="text-gray-200"/></NaviButton>
            <NaviButton func={setActiveSection} value={"dishes"}>Dish Management <FontAwesomeIcon icon={faUtensils} className="text-gray-200"/></NaviButton>
            <NaviButton func={setActiveSection} value={"basket"}>Basket Management <FontAwesomeIcon icon={faClipboardList} className="text-gray-200"/></NaviButton>
        </section>
    )
}
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

    const {navigationIsOpen, setActiveSection} = useContext(KitchenContext);

    const NAV_VALUES = [
        {
            value: "recipes",
            label: "Recipe Management",
            icon: faBookOpen
        },
        {
            value: "dishes",
            label: "Dish Management",
            icon: faUtensils
        },
        {
            value: "basket",
            label: "Basket Management",
            icon: faClipboardList
        },

    ]

    return(
        <section className={getSectionStyle(navigationIsOpen)}>
            <h4 className={headingStyle}>NAVIGATION</h4>
            {NAV_VALUES.map(({value, label, icon}, i) => (
                <NaviButton func={setActiveSection} value={value} key={i}>
                    {label}
                    <FontAwesomeIcon icon={icon} className="text-gray-200"/>
                </NaviButton>
            ))}
        </section>
    )
}
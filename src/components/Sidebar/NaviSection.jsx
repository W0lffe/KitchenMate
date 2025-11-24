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
import { nav_labels } from "../../util/util";


/**
 * UI component for navigation buttons section in sidebar
 * @returns UI for navigation section
 */
export default function NaviSection(){

    const {navigationIsOpen, setActiveSection, user} = useContext(KitchenContext);
    const labelsToUse = nav_labels[user.cookType];
    /**
     * Navigation button values and icons
     */
    const NAV_VALUES = [
        {
            value: "recipes",
            label: labelsToUse[0],
            icon: faBookOpen
        },
        {
            value: "dishes",
            label: labelsToUse[1],
            icon: faUtensils
        },
        {
            value: "basket",
            label: labelsToUse[2],
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
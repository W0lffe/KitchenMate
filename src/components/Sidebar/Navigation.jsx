import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import UserSection from "./UserSection";
import NaviSection from "./NaviSection";
import { getWrapperStyle, topSection, getIconStyle } from "./navigationStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

/**
 * Navigation component for the sidebar
 * @returns Navigation UI
 */
export default function Navigation(){

    const {toggleNavigation, navigationIsOpen, user} = useContext(KitchenContext);

    const userIsLogged = (user) && (user?.id !== null && user?.user !== null);
    const handleClick = () => {
        toggleNavigation();
    }

    return(
        <div className={getWrapperStyle(navigationIsOpen)}>
            <section className={topSection}>
                <FontAwesomeIcon icon={faForward} 
                                className={getIconStyle(navigationIsOpen)}
                                onClick={handleClick}/>
            </section>
            <UserSection />
            {userIsLogged && 
                <NaviSection />
            }
        </div>
    )
}
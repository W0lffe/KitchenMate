import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import UserSection from "./UserSection";
import NaviSection from "./NaviSection";
import { topStyle } from "./navigationStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, 
        faBackward} from "@fortawesome/free-solid-svg-icons";

export default function Navigation(){

    const {toggleNavigation, navigationIsOpen} = useContext(KitchenContext);

    const handleClick = () => {
        toggleNavigation();
    }

    return(
        <>
            <section className={topStyle}>
                <FontAwesomeIcon icon={navigationIsOpen ? faBackward : faForward} 
                                className={navigationIsOpen ? "text-gray-400 animate-pulse" : "text-gray-400"}
                                onClick={handleClick}/>
            </section>
            <UserSection />
            <NaviSection />
        </>
    )
}
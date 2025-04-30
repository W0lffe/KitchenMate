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

    const content = navigationIsOpen ? <FontAwesomeIcon icon={faBackward} className="text-gray-400 animate-pulse" /> : 
                                        <FontAwesomeIcon icon={faForward} className="text-gray-400"/>;

    return(
        <>
        <section className={topStyle}>
            <p onClick={handleClick}>{content}</p>
        </section>
        <UserSection />
        <NaviSection />
        </>
    )
}
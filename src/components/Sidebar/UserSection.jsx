import { getSectionStyle, 
        signupStyle } from "./navigationStyles"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, 
        faRightToBracket, 
        faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { naviButtonStyle } from "../Buttons/buttonStyles"

export default function UserSection(){

    const {navigationIsOpen, user, setModalState, setUser} = useContext(KitchenContext);
    const userIsLogged = user.name !== undefined && user.id !== null;

    return(
        <section className={getSectionStyle(navigationIsOpen)}>
            {userIsLogged ?
                        (<> 
                        <p>Welcome back, {user.name}!</p>
                        <img alt="IMAGE OF USER"></img>
                        <button className={naviButtonStyle} 
                                onClick={() => setUser({id: 0})}>Logout <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-200"/></button>  </>) : 
                        (<>
                        <FontAwesomeIcon icon={faUser} className="text-gray-200"/>
                        <button onClick={() => setModalState("login", true)} 
                                className={naviButtonStyle}>Login <FontAwesomeIcon icon={faRightToBracket} className="text-gray-200"/>
                        </button>   </>)}
                        {!userIsLogged ? <p className={signupStyle} onClick={() => setModalState("signup", true)}>Not an user yet? Click here to begin.</p> : null}
        </section>
    )
}
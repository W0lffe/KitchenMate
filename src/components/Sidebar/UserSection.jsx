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

    const {navigationIsOpen, userIsLogged, user, setModalState} = useContext(KitchenContext)

    return(
        <section className={getSectionStyle(navigationIsOpen)}>
            {userIsLogged ?
                        (<> 
                        <p>Welcome back, {user}!</p>
                        <img alt="IMAGE OF USER"></img>
                        <button className={naviButtonStyle}>Logout <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-200"/></button>  </>) : 
                        (<>
                        <FontAwesomeIcon icon={faUser} className="text-gray-200"/>
                        <button onClick={() => setModalState("login")} className={naviButtonStyle}>Login <FontAwesomeIcon icon={faRightToBracket} className="text-gray-200"/></button>   </>)}
                        <p className={signupStyle} onClick={() => setModalState("signup")}>Not an user yet? Click here to begin.</p>
        </section>
    )
}
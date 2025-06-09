import { getSectionStyle, 
        signupStyle } from "./navigationStyles"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, 
        faRightToBracket, 
        faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { naviButtonStyle } from "../Buttons/buttonStyles";
import defaultUser from "../../assets/default_user.png"

export default function UserSection(){

    const {navigationIsOpen, user, setModalState, setUser} = useContext(KitchenContext);
    const userIsLogged = user.name !== undefined && user.id !== null;

    const handleLoginClick = () => { setModalState("login", true) };

    const handleLogout = () => { setUser({id: 0}) };

    const handleSignupClick = () => { () => setModalState("signup", true) };

    return(
        <section className={getSectionStyle(navigationIsOpen)}>
            {userIsLogged ?
                        (<> 
                        <p>Welcome back, {user.name}!</p>
                        <img alt="IMAGE OF USER" src={user.img || defaultUser}/>
                        <button className={naviButtonStyle} onClick={handleLogout}>
                                Logout 
                                <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-200"/>
                        </button>  
                        </>
                        ) : (
                        <>
                        <FontAwesomeIcon icon={faUser} className="text-gray-200"/>
                        <button onClick={handleLoginClick} className={naviButtonStyle}>
                                Login 
                                <FontAwesomeIcon icon={faRightToBracket} className="text-gray-200"/>
                        </button>   </>)}
                        {!userIsLogged && <p className={signupStyle} onClick={handleSignupClick}>Not an user yet? Click here to begin.</p>}
        </section>
    )
}
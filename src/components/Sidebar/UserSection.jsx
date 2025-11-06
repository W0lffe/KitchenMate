import {
        getSectionStyle,
        signupStyle
} from "./navigationStyles"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faUser,
        faRightToBracket,
        faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { naviButtonStyle } from "../Buttons/buttonStyles";
import defaultUser from "../../assets/default_user.png"
import { handleToast } from "../../util/toast";

export default function UserSection() {

        const { navigationIsOpen, user, setModalState, setUser, isOnline } = useContext(KitchenContext);
        const userIsLogged = (user !== null) && (user?.user !== null && user?.id !== null);

        const handleUserClick = (section) => {
                if (isOnline) {
                        setModalState({ section }, true);
                } else {
                        handleToast({ error: "Error with connection to server." });
                }
        };

        const handleLogout = async () => { 
                
                localStorage.removeItem("token");
                setUser(null);
                handleToast({success: "Logged out successfully."});
        };

        return (
                <section className={getSectionStyle(navigationIsOpen)}>
                        {userIsLogged ? (
                                <>
                                        <p>Welcome back, {user.user}!</p>
                                        <img alt="IMAGE OF USER" src={user.img || defaultUser} className="size-30" />
                                        <button className={naviButtonStyle} onClick={handleLogout}>
                                                Logout
                                                <FontAwesomeIcon icon={faRightFromBracket} className="text-gray-200" />
                                        </button>
                                </>
                        ) : (
                                <>
                                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                        <button onClick={() => handleUserClick("login")} className={naviButtonStyle}>
                                                Login
                                                <FontAwesomeIcon icon={faRightToBracket} className="text-gray-200" />
                                        </button>
                                </>
                        )}
                        {!userIsLogged && <p className={signupStyle} onClick={() => handleUserClick("signup")}>Not an user yet? Click here to begin.</p>}
                </section>
        )
}
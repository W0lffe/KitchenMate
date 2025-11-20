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
import { useNavigate } from "react-router-dom";

/**
 * User section of the sidebar navigation
 * @returns UI for user section
 */
export default function UserSection() {

        const { navigationIsOpen, user, setModalState, setUser} = useContext(KitchenContext);
        const userIsLogged = (user !== null) && (user?.name !== null && user?.id !== null);
        const navigate = useNavigate();
        /**
         * Function handle clicks for login/signup, opening the respective modal if online
         * @param {string} section respective section to open
         */
        const handleUserClick = (section) => {
                setModalState({ section }, true);
        };

        /**
         * Function to handle user logout, removing token and resetting user state
         */
        const handleLogout = async () => { 
                
                localStorage.removeItem("token");
                setUser(null);
                handleToast({success: "Logged out successfully."});
        };

        return (
                <section className={getSectionStyle(navigationIsOpen)}>
                        {userIsLogged ? (
                                <>
                                        <p>Welcome back, {user.name}!</p>
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
                        {!userIsLogged && <p className={signupStyle} onClick={() => navigate("/signup")}>Not an user yet? Click here to begin.</p>}
                </section>
        )
}
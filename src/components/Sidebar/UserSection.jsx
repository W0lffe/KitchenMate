import { getSectionStyle } from "./navigationStyles"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


export default function UserSection(){

    const {navigationIsOpen, userIsLogged, user} = useContext(KitchenContext)

    return(
        <section className={getSectionStyle(navigationIsOpen)}>
            {userIsLogged ?
                        (<> 
                        <p>Welcome back, {user}!</p>
                        <img alt="IMAGE OF USER"></img>
                        <button>Logout</button>  </>) : 
                        (<>
                        <FontAwesomeIcon icon={faUser} className="text-gray-200"/>
                        <button>Login</button>   </>)}
        </section>
    )
}
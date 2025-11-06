import logo from "../../assets/whiteKitchenmate.png"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useEffect } from "react"
import { HeaderStyle, 
        logoStyle, 
        sloganStyle,
        homeHeader } from "./headerStyles";


/**
 * Header component for the application.
 * @param {JSX} children Optional children to render within the header
 * @returns Header component with preset elements or custom children
 */
export default function Header({children}){

    const {slogan, setSlogan} = useContext(KitchenContext);

    useEffect(() => {
        setSlogan();
    }, [])

    if(children){
         return(
        <header className={homeHeader}>
           <img src={logo} alt="KitchenMate" className={"object-contain"} />
            {children}
        </header>
    )
    }

    return(
        <header className={HeaderStyle}>
           <img src={logo} alt="KitchenMate" className={logoStyle} />
            <label className={sloganStyle}>{slogan}</label>
        </header>
    )
}
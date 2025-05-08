import logo from "../../assets/whiteKitchenmate.png"
import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useEffect } from "react"
import { HeaderStyle, 
        logoStyle, 
        sloganStyle } from "./headerStyles";

export default function Header(){

    const {slogan, setSlogan, setAvailableRecipes, setAvailableBasket, setAvailableDishes} = useContext(KitchenContext);

    useEffect(() => {
        setSlogan();
        setAvailableRecipes();
        setAvailableDishes();
        setAvailableBasket();
    }, [])

    return(
        <header className={HeaderStyle}>
           <img src={logo} alt="KitchenMate" className={logoStyle} />
            <h2 className={sloganStyle}>{slogan}</h2>
        </header>
    )
}
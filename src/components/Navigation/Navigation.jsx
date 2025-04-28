import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import Button from "../Button/Button";
import { getSectionStyle, topStyle, headingStyle } from "./navigationStyles";


export default function Navigation(){

    const {toggleNavigation, setActiveSection, navigationIsOpen} = useContext(KitchenContext);

    const handleClick = () => {
        toggleNavigation();
    }

    return(
        <>
        <section className={topStyle}>
            <p onClick={handleClick}>{navigationIsOpen ? "CLOSE" : "OPEN"}</p>
        </section>
        <section className={getSectionStyle(navigationIsOpen)}>
            <h4 className={headingStyle}>Navigation</h4>
            <Button func={setActiveSection} value={"recipes"}>Recipe Management</Button>
            <Button func={setActiveSection} value={"dishes"}>Dish Management</Button>
            <Button func={setActiveSection} value={"basket"}>Basket Management</Button>
        </section>
        <section className={getSectionStyle(navigationIsOpen)}>
            <p>Image of logged in?</p>
            <p>Login/logout button</p>
        </section>
        </>
    )
}
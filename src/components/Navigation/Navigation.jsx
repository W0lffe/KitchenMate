import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import Button from "../Button/Button";


export default function Navigation(){

    const {toggleNavigation, setActiveSection} = useContext(KitchenContext);

    const handleClick = () => {
        toggleNavigation();
    }

    return(
        <div className="w-full border border-red-400">
        <section className="flex flex-col w-full justify-center items-center p-5">
            <p onClick={handleClick}>TOGGLE TO OPEN/CLOSE</p>
        </section>
        <section className="flex flex-col w-full justify-center items-center p-5 border border-red-600">
            <h4>Navigation</h4>
            <Button func={setActiveSection} value={"recipes"}>Recipe Management</Button>
            <Button func={setActiveSection} value={"dishes"}>Dish Management</Button>
            <Button func={setActiveSection} value={"basket"}>Basket Management</Button>
        </section>
        <section>
            <p>Image of logged in?</p>
            <p>Login/logout button</p>

        </section>
        </div>
    )
}
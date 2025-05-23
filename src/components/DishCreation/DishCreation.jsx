import { useContext } from "react"
import { KitchenContext } from "../../context/KitchenContext"
import SubmitButton from "../Buttons/SubmitButton"
import DishInfoSection from "./DishInfoSection"

export default function DishCreation(){

    const {isMobile, setModalState} = useContext(KitchenContext)

    const mobileHeading = "Dish Creation"

    return(
        <div>
           {isMobile ? 
                       <span className="flex flex-row justify-end items-center px-2 text-white">
                           <h2 className="">{mobileHeading}</h2>
                           <SubmitButton use={"close"} func={setModalState} />
                       </span> 
            : null}
            <DishInfoSection />
        </div>
    )
}
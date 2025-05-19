import FormList from "../FormList/FormList"
import SubmitButton from "../Buttons/SubmitButton";
import Errors from "../Error/Errors"
import { useContext, 
        useEffect, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateAll } from "../../util/validation";

export default function ManualBasketEntry(){

    const {isMobile, setModalState, addNewProduct, editStatus, availableBasket} = useContext(KitchenContext)

    const isEditing = editStatus.mode === "edit";   
    const heading = isEditing ? "Edit Basket" : "Add Items";

    let initialState = {
        errors: [],
        validInputs: {
            products: !isEditing ? [] : availableBasket.map((item) => item.product),
            quantity: !isEditing ? [] : availableBasket.map((item) => item.quantity),
            unit: !isEditing ? [] : availableBasket.map((item) => item.unit)
        }
    }

    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if(isEditing){
            setFormState({
                errors: [],
                validInputs: {
                    products: availableBasket.map((item) => item.product),
                    quantity: availableBasket.map((item) => item.quantity),
                    unit: availableBasket.map((item) => item.unit)
                }}
            )
        }
        console.log(formState);
       
    }, [availableBasket, isEditing])

    const submitEntries = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");
        console.log(products, quantity, unit)

        const errors = validateAll(null, null, null, null, 
                                    products, quantity, unit, null);
        
        if(errors.length > 0){
            console.log(errors)
            setFormState({
                errors,
                validInputs: {
                    products,
                    quantity,
                    unit
                }
            })
            return;
        }

        const combinedProducts = combineProductData(products, quantity, unit);
        console.log(combinedProducts)

        if(!isEditing){
            addNewProduct(combinedProducts);
        }

        
    }

    return(
        <div className="text-white w-full p-2">
            {isMobile ? (
                <section className="flex flex-col items-center mb-5 gap-2">
                    <header className="flex w-full justify-end">
                        <SubmitButton use={"close"} func={setModalState} />
                    </header>
                    <h3>{heading}</h3>
                </section>
            ) : null}
            <Errors errors={formState.errors}/>
            <form onSubmit={submitEntries} className="flex flex-col items-center gap-5">
                <FormList use={"Items"} state={formState}/>
                <footer>
                    <SubmitButton use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}
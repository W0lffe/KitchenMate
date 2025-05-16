import FormList from "../FormList/FormList"
import SubmitButton from "../Buttons/SubmitButton";
import Errors from "../Error/Errors"
import { useContext, useEffect, useState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateAll } from "../../util/validation";
import { useActionState } from "react";

export default function ManualBasketEntry(){

    const {isMobile, setModalState, addProductsToBasket, editStatus, availableBasket} = useContext(KitchenContext)

    const isEditMode = editStatus.mode === "edit";
    let initialFormState = {errors: null};

    const [isEditing, setIsEditing] = useState(false);
    let heading = "Add Items";

    useEffect(() => {
        setIsEditing(prevState => !prevState)
    }, [editStatus]);

    if(isEditMode){

        heading = "Edit Basket"
        const products = availableBasket.map((product) => product.product);
        const quantity = availableBasket.map((product) => product.quantity);
        const unit = availableBasket.map((product) => product.unit);
        
        initialFormState = {
            errors: null,
            validInputs: {
                products,
                quantity, 
                unit
            }
        }

        console.log(products, quantity, unit)
 
    const manualEntry = (prevFormState, formData) => {
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");

        const errors = validateAll(null, null, null, null, 
                                    products, quantity, unit, null);

        let items;
        if(products.length === unit.length && unit.length === quantity.length){
            items = combineProductData(products, quantity, unit)
        }
        else{
            errors.push("Error adding items to basket.")
        }

        if(errors.length > 0){
            return {
                errors,
                validInputs: {
                    products,
                    quantity,
                    unit
                }
            }
        }

        addProductsToBasket(items);
        setModalState(null);
        return {errors: null}

    }

    const [formState, formAction] = useActionState(manualEntry, initialFormState)

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
            <form action={formAction} className="flex flex-col items-center gap-5">
                <FormList use={"Items"} state={formState}/>
                <footer>
                    <SubmitButton use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}}
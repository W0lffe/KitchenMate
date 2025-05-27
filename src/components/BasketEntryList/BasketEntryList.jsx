import FormList from "../FormList/FormList"
import SubmitButton from "../Buttons/SubmitButton";
import Errors from "../Error/Errors"
import { useContext, 
        useActionState, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateAll } from "../../util/validation";

export default function ManualBasketEntry(){

    const {isMobile, setModalState, addNewProduct, editStatus, availableBasket, updateProducts} = useContext(KitchenContext)

    const isEditing = editStatus.mode === "edit";   
    const heading = isEditing ? "Edit Basket" : "Add Items";
    const use = isEditing ? "Edit" : "Items"; 

    let initialState = {errors: null};

    if (isEditing) {
            initialState = ({
                errors: null,
                validInputs: {
                    products: availableBasket.map((product) => product.product),
                    quantity: availableBasket.map((product) => product.quantity),
                    unit: availableBasket.map((product) => product.unit),
                },
                obtainedItems: availableBasket.map((product, index) => product.obtained ? index : null)
            });
    } 

    const [initialFormState, setInitialFormState] = useState(initialState);

    const manualEntry = (prevFormState, formData) => {
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");

        const errors = validateAll(null, null, null, null, 
                                    products, quantity, unit, null);
        
        const combinedProducts = combineProductData(products, quantity, unit);
        
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

        if(isEditing){
            const updatedProducts = [...combinedProducts].map((product, productIndex) => {
                const updated = initialFormState.obtainedItems.includes(productIndex) ?
                                {...product, obtained: true} : product;
                return updated;
            })
            console.log(updatedProducts)
            updateProducts(updatedProducts)
        }
        else{
            addNewProduct(combinedProducts);
        }

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
                <FormList use={use} state={formState}/>
                <footer>
                    <SubmitButton use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}
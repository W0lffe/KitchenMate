import FormList from "../FormList/FormList"
import SubmitButton from "../Buttons/SubmitButton";
import Errors from "../Error/Errors"
import { useContext, 
        useActionState, 
        useState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateAll } from "../../util/validation";
import toast from "react-hot-toast";

export default function ManualBasketEntry(){

    const {isMobile, setModalState, editStatus, fullBasket, handleRequest, setEntryStatus} = useContext(KitchenContext)

    const isEditing = editStatus.mode === "edit";   
    const heading = isEditing ? "Edit Basket" : "Add Items";
    const use = isEditing ? "Edit" : "Items"; 
    const availableBasket = fullBasket.current;

    let initialState = {errors: null};

    if (isEditing) {
            initialState = ({
                errors: null,
                validInputs: {
                    products: availableBasket.map((product) => product.product),
                    quantity: availableBasket.map((product) => product.quantity),
                    unit: availableBasket.map((product) => product.unit),
                },
                obtainedItems: availableBasket.map((product, index) => product.obtained ? index : null),
                itemID: availableBasket.map((product) => product.id)
            });
    } 

    const [initialFormState, setInitialFormState] = useState(initialState);

    const manualEntry = async(prevFormState, formData) => {
        const products = formData.getAll("product");
        const quantity = formData.getAll("quantity");
        const unit = formData.getAll("unit");

        const errors = validateAll(null, null, null, null, 
                                    products, quantity, unit, null);
        
        const combinedProducts = combineProductData(products, quantity, unit);
        
        if(errors.length > 0){
            toast.error((t) => (
                 <Errors errors={errors}/>
            ), {duration: 5000});
            return {
                validInputs: {
                    products,
                    quantity,
                    unit
                }
            }
        }

        const productData = !isEditing ? combinedProducts : 
                            [...combinedProducts].map((product, productIndex) => {
                            const updated = initialFormState.obtainedItems.includes(productIndex) ?
                                {...product, obtained: true, id: initialFormState.itemID[productIndex]} :
                                {...product, id: initialFormState.itemID[productIndex]};
                                return updated;
                            })

        const response = await handleRequest({
                data: productData,
                method: isEditing ? "PUT" : "POST"
        })
        const {error, success} = response;
        
        if(error){
            toast.error(error);
            return;
        }

        toast.success(success);
        setTimeout(() => {
            setEntryStatus(null);
            if(isMobile){
                setModalState(null);
            }
        }, 1250);
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
            <form action={formAction} className="flex flex-col items-center gap-5">
                <FormList use={use} state={formState}/>
                <footer>
                    <SubmitButton use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}
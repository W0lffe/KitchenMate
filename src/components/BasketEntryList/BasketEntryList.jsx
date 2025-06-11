import FormList from "../FormList/FormList"
import SubmitButton from "../Buttons/SubmitButton";
import Errors from "../Error/Errors"
import { useContext, 
        useActionState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateAll } from "../../util/validation";
import toast from "react-hot-toast";

const getFormValues = (formData) => {
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");

    return {products, quantity, unit};
}

const mapProductData = (productData) => {
    const {products, index, id} = productData;
    return products.map((product, i) => ({
        ...product,
        id: id[i],
        ...(index.includes(i) && {obtained: true})
    }))
}

export default function ManualBasketEntry(){

    const {isMobile, setModalState, editStatus, fullBasket, handleRequest, setEntryStatus} = useContext(KitchenContext)

    const isEditing = editStatus.mode === "edit";   
    const heading = isEditing ? "Edit Basket" : "Add Items";
    const use = isEditing ? "Edit" : "Items"; 
    const availableBasket = fullBasket.current;

    const initialState = isEditing ? {
                validInputs: {
                    products: availableBasket.map((product) => product.product),
                    quantity: availableBasket.map((product) => product.quantity),
                    unit: availableBasket.map((product) => product.unit),
                },
                obtainedIndexes: availableBasket.map((product, index) => product.obtained ? index : null)
                                                    .filter(index => index !== null),
                itemIds: availableBasket.map((product) => product.id)
            } : {validInputs: null};

    console.log(initialState)

    const manualEntry = async(prevFormState, formData) => {
        const {products, quantity, unit} = getFormValues(formData)
        const errors = validateAll(null, null, null, null, 
                                    products, quantity, unit, null);
        
        const combinedProducts = combineProductData(products, quantity, unit);
        
        const validInputs = {
                products,
                quantity,
                unit
        }
        
        if(errors.length > 0){
            toast.error((t) => (
                 <Errors errors={errors}/>
            ), {duration: 5000});
            return {
                validInputs
            }
        }

        const productData = !isEditing ? combinedProducts :
                                        mapProductData({
                                            products: combinedProducts,
                                            index: initialState.obtainedIndexes,
                                            id: initialState.itemIds
                                        });
        
        const response = await handleRequest({
                data: productData,
                method: isEditing ? "PUT" : "POST"
        })
        const {error, success} = response;
        
        if(error){
            toast.error(error);
            return {validInputs}
        }

        const successToast =  `Product${combinedProducts.length > 1 ? "s" : ""} added to basket successfully!`;
        toast.success(isEditing ? success : successToast);

        setTimeout(() => {
            setEntryStatus(null);
            if(isMobile){
                setModalState(null);
            }
        }, 1250);
        return {validInputs}
    }

    const [formState, formAction] = useActionState(manualEntry, initialState);

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
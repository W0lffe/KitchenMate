import FormList from "../FormList/FormList"
import Button from "../Buttons/Button";
import { useContext, 
        useActionState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateProducts } from "../../util/validation";
import { handleToast } from "../../util/toast";
import handleErrorsToast from "../Error/Errors";
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


    const manualEntry = async(prevFormState, formData) => {
        const {products, quantity, unit} = getFormValues(formData);
        const errors = validateProducts(products, quantity, unit);
        
        const combinedProducts = combineProductData(products, quantity, unit);
        
        const validInputs = {
                products,
                quantity,
                unit
        };
        
        if(errors.length > 0){
            handleErrorsToast(errors);
            return { validInputs };
        };

        const productData = !isEditing ? combinedProducts :
                                        mapProductData({
                                            products: combinedProducts,
                                            index: initialState.obtainedIndexes,
                                            id: initialState.itemIds
                                        });
        
        const response = await handleRequest({
                data: productData,
                method: isEditing ? "PUT" : "POST"
        });
        const {error, success} = response;

        const successToast =  `Product${combinedProducts.length > 1 ? "s" : ""} added to basket successfully!`;

        handleToast({
            error,
            success: isEditing ? success : successToast,
            setEntryStatus,
            setModalState,
        })

        return {validInputs}
    }

    const [formState, formAction] = useActionState(manualEntry, initialState);

    return(
        <div className="">
            {isMobile ? (
                <section className="">
                    <header className="">
                        <Button use={"close"} />
                    </header>
                    <h3>{heading}</h3>
                </section>
            ) : null}
            <form action={formAction} className="">
                <FormList use={use} state={formState}/>
                <footer>
                    <Button use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}
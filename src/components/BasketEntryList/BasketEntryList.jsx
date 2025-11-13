import FormList from "../FormList/FormList"
import Button from "../Buttons/Button";
import { useContext, 
        useActionState } from "react"
import { KitchenContext } from "../../context/KitchenContext";
import { combineProductData } from "../../util/util";
import { validateProducts } from "../../util/validation";
import { handleToast } from "../../util/toast";
import handleErrorsToast from "../Error/Errors";

/**
 * Used to extract form values from FormData object
 * @param {Object} formData 
 * @returns {Object} extracted form values
 */
const getFormValues = (formData) => {
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");

    return {products, quantity, unit};
}

/**
 * Used to map product data with obtained status and ids
 * @param {*} productData 
 * @returns {Object} mapped product data
 */
const mapProductData = (productData) => {
    const {products, index, id} = productData;
    return products.map((product, i) => ({
        ...product,
        id: id[i],
        ...(index.includes(i) ? {obtained: 1} : {obtained: 0})
    }))
}

/**
 * Used to create or edit manual basket entries
 * @returns component handling manual basket entry form
 */
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
                obtainedIndexes: availableBasket.map((product, index) => product.obtained === "1" ? index : null)
                                                    .filter(index => index !== null),
                itemIds: availableBasket.map((product) => product.id)
            } : {validInputs: null};

    console.log(initialState)

    /**
     * Form action to handle manual entry submission
     * @param {*} prevFormState 
     * @param {*} formData 
     * @returns {Object} updated form state, either with errors or as null
     */
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
        <div className={`text-white`}>
            {isMobile && (
                <section className="flex p-2">
                    <h3 className="w-full text-center text-lg italic">{heading}</h3>
                    <Button use={"close"} />
                </section>
            )}
            <form action={formAction} className={`flex flex-col`}>
                <FormList use={use} state={formState}/>
                <footer className={`flex flex-row w-full items-center justify-center p-2`}>
                    <Button use={"basket"}/>
                </footer>
            </form>
        </div>
   )
}
import { useCallback } from "react";
import Errors from "../components/Error/Errors"
import toast from "react-hot-toast";
import { validateDish } from "../util/validation";
import { deriveFormStateValues, getDishFromValues } from "../util/util";

export default function useDishForm({isMobile, currentFormValues, handleRequest, setActiveDish, setModalState}) {
    return useCallback(async (prevFormState, formData) => {
        
        const formValues = !isMobile ? 
        getDishFromValues(formData, currentFormValues) : deriveFormStateValues(currentFormValues);

        const {name, course, image, components} = formValues;

        const errors = validateDish({
            name, 
            course, 
            components
        })
        
        const hasImage = image && image.size > 0;

        const validInputs = {
            name,
            course,
            image: hasImage ? image : null,
            components
        }

        if(errors.length > 0){
            toast.error((t) => (
                <Errors errors={errors}/>
            ), {duration: 5000})
            return {
                validInputs
            }
        }

        const newDish = {
            name,
            course,
            image,
            favorite: currentFormValues?.isFavorite || false,
            id: currentFormValues?.modifiedId || null,
            components
        }

        const response = await handleRequest({
            data: newDish,
            method: currentFormValues.isEditing ? "PUT" : "POST"
        })
        const {error, success} = response;

        if(error){
            toast.error(error);
            return {
                validInputs
            }
        }

        toast.success(success);
        setTimeout(() => {
            setActiveDish(null)
            if(isMobile){
                setModalState({}, false)
            }
        }, 1250);
        return {validInputs};
    
    }, [isMobile, currentFormValues, handleRequest, setActiveDish, setModalState])
}
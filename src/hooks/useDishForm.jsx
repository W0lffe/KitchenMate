import { useCallback } from "react";
import { validateName } from "../util/validation";
import Errors from "../components/Error/Errors"
import toast from "react-hot-toast";

const validateInputs = (inputs) => {

    const {name, course, components} = inputs;
    let errors = [];

    if(!validateName(name)){
            errors.push("Dish name is invalid!");
    }
    if(course === "course"){
            errors.push("Please select a course!");
    }
    if(components.length === 0){
            errors.push("Please add components!");
    }

    return errors;
}

const deriveValues = (state) => {
    const name = state.validInputs?.name || "";
    const course = state.validInputs?.course || "";
    const image = state.validInputs?.image || null;
    const components = state.validInputs?.components || [];
    return { name, course, image, components };
}

const getFormDataValues = (formData, state) => {
    const name = formData.get("name");
    const course = formData.get("course");
    const image = formData.get("image");
    const components = state?.validInputs?.components || [];
    return { name, course, image, components };
}


export default function useDishForm({isMobile, currentFormValues, handleRequest, setActiveDish, setModalState}) {
    return useCallback(async (prevFormState, formData) => {
        
        const formValues = !isMobile ? 
        getFormDataValues(formData, currentFormValues) : deriveValues(currentFormValues);

        const {name, course, image, components} = formValues;

        const errors = validateInputs({
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
                setModalState(null)
            }
        }, 1250);
        return {validInputs};
    
    }, [isMobile, currentFormValues, handleRequest, setActiveDish, setModalState])
}
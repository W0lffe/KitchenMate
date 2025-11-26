import { useCallback } from "react";
import handleErrorsToast from "../components/Error/Errors"
import { validateDish } from "../util/validation";
import { deriveFormStateValues, getDishFormValues } from "../util/formHelpers.js";
import { handleToast } from "../util/toast";

/**
 * Form handler hook for Dish Creation/Editing forms
 * @param {boolean} isMobile indicates if device is mobile
 * @param {Object} currentFormValues current form values state
 * @param {Function} handleRequest function to handle API request
 * @param {Function} setActiveDish function to set active dish state
 * @param {Function} setModalState function to set modal state
 * @returns valid inputs from form submission either null or with errors
 */
export default function useDishForm({ isMobile, currentFormValues, handleRequest, setActiveDish, setModalState }) {
    return useCallback(async (prevFormState, formData) => {

        const formValues = !isMobile ?
            getDishFormValues(formData, currentFormValues) : deriveFormStateValues(currentFormValues);

        const { name, course, image, components } = formValues;

        //console.log("form",formValues);

        const errors = validateDish({
            name,
            course,
            components
        });

        const currentImage = currentFormValues?.validInputs?.image ?? null;
        const hasNewImage = image && image.size > 0;

        //console.log({current: currentImage, hasNewImage})

        const validInputs = {
            name,
            course,
            image: hasNewImage ? image : currentImage,
            components
        };

        if (errors.length > 0) {
            handleErrorsToast(errors);
            return { validInputs };
        }

        const newDish = {
            name,
            course,
            image: hasNewImage ? image : currentImage,
            favorite: currentFormValues?.isFavorite,
            id: currentFormValues?.modifiedId || null,
            components
        };

        //console.log("new dish", newDish)

        const response = await handleRequest({
            data: newDish,
            method: currentFormValues.isEditing ? "PUT" : "POST"
        });
        const { error, success } = response;

        handleToast({
            error,
            success,
            setActiveDish,
            setModalState,
        });

        return { validInputs };

    }, [isMobile, currentFormValues, handleRequest, setActiveDish, setModalState])
}
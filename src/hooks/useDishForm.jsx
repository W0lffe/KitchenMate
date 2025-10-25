import { useCallback } from "react";
import handleErrorsToast from "../components/Error/Errors"
import { validateDish } from "../util/validation";
import { deriveFormStateValues, getDishFromValues } from "../util/util";
import { handleToast } from "../util/toast";

export default function useDishForm({ isMobile, currentFormValues, handleRequest, setActiveDish, setModalState }) {
    return useCallback(async (prevFormState, formData) => {

        const formValues = !isMobile ?
            getDishFromValues(formData, currentFormValues) : deriveFormStateValues(currentFormValues);

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
            favorite: currentFormValues?.isFavorite || false,
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
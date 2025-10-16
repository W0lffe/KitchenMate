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

        const errors = validateDish({
            name,
            course,
            components
        });

        const hasImage = image && image.size > 0;

        const validInputs = {
            name,
            course,
            image: hasImage ? image : null,
            components
        };

        if (errors.length > 0) {
            handleErrorsToast(errors);
            return { validInputs };
        }

        const newDish = {
            name,
            course,
            image,
            favorite: currentFormValues?.isFavorite || false,
            id: currentFormValues?.modifiedId || null,
            components
        };

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
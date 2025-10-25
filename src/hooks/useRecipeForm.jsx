import { useCallback } from "react";
import { validateRecipe } from "../util/validation";
import { getRecipeFormValues, deriveFormStateValues } from "../util/util";
import { combineProductData, getTimestamp } from "../util/util";
import handleErrorsToast from "../components/Error/Errors";
import { handleToast } from "../util/toast";


export function useRecipeForm({ isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState }) {
  return useCallback(async (prevFormState, formData) => {

    const formValues = !isMobile ? getRecipeFormValues(formData) : deriveFormStateValues(currentFormValues, true);

    console.log(formValues);

    const { name, portions, output, outputType, time, timeFormat, products, quantity, unit, steps , category} = formValues;

    console.log(category);

    const errors = validateRecipe(name, portions, time, timeFormat, products, quantity, unit, steps);
    const ingredients = combineProductData(products, quantity, unit);

    const validInputs = { name, portions, output, time, timeFormat, products, quantity, unit, steps, category };

    if (errors.length > 0) {
      handleErrorsToast(errors);
      return { validInputs };
    };

    const newRecipe = {
      name,
      portions,
      output,
      outputType,
      time,
      timeFormat,
      ingredients,
      instructions: steps,
      favorite: currentFormValues.isFavorited,
      id: currentFormValues.modifiedId,
      date: getTimestamp(),
      category
    };

    const response = await handleRequest({
      data: newRecipe,
      method: currentFormValues.isEditing ? "PUT" : "POST"
    });
    const { success, error } = response;

    handleToast({
      error,
      success,
      setActiveRecipe,
      setModalState,
    })

    return { validInputs };
  }, [isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState]);
}

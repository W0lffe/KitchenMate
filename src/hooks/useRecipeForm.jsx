import { useCallback } from "react";
import { validateRecipe } from "../util/validation";
import { getRecipeFormValues, deriveFormStateValues } from "../util/util";
import { combineProductData, getTimestamp } from "../util/util";
import handleErrorsToast from "../components/Error/Errors";
import { handleToast } from "../util/toast";

/**
 * Form handling hook for recipe creation/editing form submission
 * @param {boolean} isMobile indicates if device is mobile
 * @param {Object} currentFormValues current form values state
 * @param {Function} handleRequest function to make API request
 * @param {Function} setActiveRecipe function to set active recipe in context
 * @param {Function} setModalState function to set modal state in context
 * @returns valid inputs to update form state either null or with errors
 */
export function useRecipeForm({ isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState }) {
  return useCallback(async (prevFormState, formData) => {

    const formValues = !isMobile ? getRecipeFormValues(formData) : deriveFormStateValues(currentFormValues, true);

    const { name, portions, output, outputType, time, timeFormat, products, quantity, unit, steps , category} = formValues;

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
      recipeID: currentFormValues.modifiedId,
      category
    };

    console.log(newRecipe);

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

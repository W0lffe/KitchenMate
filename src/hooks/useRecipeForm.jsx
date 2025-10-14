import { useCallback } from "react";
import { validateRecipe } from "../util/validation";
import { getRecipeFormValues, deriveFormStateValues } from "../util/util";
import { combineProductData, getTimestamp } from "../util/util";
import toast from "react-hot-toast";
import Errors from "../components/Error/Errors";


export function useRecipeForm({ isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState }) {
  return useCallback(async (prevFormState, formData) => {

    const formValues = !isMobile ? getRecipeFormValues(formData) : deriveFormStateValues(currentFormValues, true);

    const { name, portions, output, outputType, time, timeFormat, products, quantity, unit, steps } = formValues;

    const errors = validateRecipe(name, portions, time, timeFormat, products, quantity, unit, steps);
    const ingredients = combineProductData(products, quantity, unit);

    const validInputs = { name, portions, output, time, timeFormat, products, quantity, unit, steps };

    if (errors.length > 0) {
      toast.error((t) => (<Errors errors={errors}/>), { duration: 5000 });
      return { validInputs };
    }

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
      date: getTimestamp()
    };

    const response = await handleRequest({
      data: newRecipe,
      method: currentFormValues.isEditing ? "PUT" : "POST"
    });
    const { success, error } = response;

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(success);
    setTimeout(() => {
      setActiveRecipe(null);
      if (isMobile) {
        setModalState({}, false)
      }
    }, 1250);
    return { validInputs: null };
  }, [isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState]);
}

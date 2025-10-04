import { useCallback } from "react";
import { validateAll } from "../util/validation";
import { getFormValues } from "../util/util";
import { combineProductData, getTimestamp } from "../util/util";
import toast from "react-hot-toast";
import Errors from "../components/Error/Errors";


export function useRecipeForm({ isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState }) {
  return useCallback(async (prevFormState, formData) => {

    const deriveValues = (state) => {
      const name = state.validInputs?.name || "";
      const portions = state.validInputs?.portions || 0;
      const output = state.validInputs?.output || "";
      const time = state.validInputs?.time || 0;
      const timeFormat = state.validInputs?.timeFormat || null;
      const products = state.validInputs?.products || [];
      const quantity = state.validInputs?.quantity || [];
      const unit = state.validInputs?.unit || [];
      const steps = state.validInputs?.steps || [];
      return { name, portions, output, time, timeFormat, products, quantity, unit, steps };
    };

    const formValues = !isMobile ? getFormValues(formData) : deriveValues(currentFormValues);
    
    const { name, portions, output, time, timeFormat, products, quantity, unit, steps } = formValues;

    const errors = validateAll(name, portions, time, timeFormat, products, quantity, unit, steps);
    const ingredients = combineProductData(products, quantity, unit);

    const validInputs = { name, portions, output, time, timeFormat, products, quantity, unit, steps };

    if (errors.length > 0) {
      toast.error((t) => (<Errors errors={errors}/>), { duration: 5000 });
      return { validInputs };
    }

    const newRecipe = {
      name,
      output: { portions, output },
      prepTime: { time, format: timeFormat },
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
        setModalState(null, false);
      }
    }, 1250);
    return { validInputs: null };
  }, [isMobile, currentFormValues, handleRequest, setActiveRecipe, setModalState]);
}

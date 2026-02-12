/**
 * Function to extract recipe form values from FormData
 * @param {FormData} formData 
 * @returns {Object} recipe form values
 */
export const getRecipeFormValues = (formData) => {
    const name = formData.get("name");
    const portions = formData.get("portions");
    const output = formData.get("output");
    const outputType = formData.get("outputType");
    const time = formData.get("time");
    const timeFormat = formData.get("timeFormat");
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");
    const steps = formData.getAll("step");
    const category = formData.get("category");

    return{ name, portions, output, outputType, time, timeFormat, 
            products, quantity, unit, steps, category };
}

/**
 * To get dish form values from FormData
 * @param {FormData} formData 
 * @param {Object} state current form state, formData
 * @returns {Object} dish form values
 */
export const getDishFormValues = (formData, state) => {
    const name = formData.get("name");
    const course = formData.get("course");
    const image = state?.validInputs?.image;
    const components = state?.validInputs?.components || [];
    return { name, course, image, components };
}

/**
 * Function to derive form state values based on whether it's a recipe or dish
 * @param {Object} state current form state, from useState
 * @param {boolean} isRecipe flag indicating if the form is for a recipe
 * @returns {Object} derived form state values
 */
export const deriveFormStateValues = (state, isRecipe) => {
    if(isRecipe){
        const name = state.validInputs?.name || "";
        const portions = state.validInputs?.portions || 0;
        const output = state.validInputs?.output || "N/A";
        const outputType = state.validInputs?.outputType || null;
        const time = state.validInputs?.time || 0;
        const timeFormat = state.validInputs?.timeFormat || null;
        const products = state.validInputs?.products || [];
        const quantity = state.validInputs?.quantity || [];
        const unit = state.validInputs?.unit || [];
        const steps = state.validInputs?.steps || [];
        const category = state.validInputs?.category || "Uncategorized";
        return { name, portions, output, outputType, time, timeFormat, products, quantity, unit, steps, category };
    }
    else{
        const name = state.validInputs?.name || "";
        const course = state.validInputs?.course || "";
        const image = state.validInputs?.image || null;
        const components = state.validInputs?.components || [];
        return { name, course, image, components };
    }
};

export const getUserFormValues = (formData) => {

    return {
        user: formData.get("username"), 
        passwd: formData.get("passwd"),
        image: formData.get("image"),
        cookType: formData.get("cookType"),
        unitType: formData.get("unitType")
    }
}
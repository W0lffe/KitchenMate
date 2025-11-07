
/**
 * Function to validate recipe properties
 * @param {string} name property name of recipe
 * @param {Number} portions property portion count of recipe
 * @param {Number} time property prep time of recipe
 * @param {string} timeFormat property time format prepping time of recipe
 * @param {Array} products property ingredients of recipe
 * @param {Array} quantity property ingredient quantities of recipe
 * @param {string} unit property ingredient units of recipe
 * @param {Array} steps property instructions of recipe
 * @returns array of possible errors on validation
 */
export const validateRecipe = (name, portions, time,
    timeFormat, products, quantity, unit, steps) => {

    /**
     * Collection of errors from validation
     */
    let errors = [];
    
    if(name !== null){
        if (!validateName(name)) {
            errors.push("Recipe name is invalid!")
        }
    }

    if(portions !== null){
        if (!validateNumber(portions)) {
            errors.push("Please enter portion quantity!")
        }
    }

    if(time !== null){
        if (!validateNumber(time)) {
            errors.push("Please enter prep time!")
        }
    }

    if(timeFormat !== null){
        if(!validateTimeFormat(timeFormat)){
            errors.push("Please select prep time format!")
        }
    }

    const productErrors = validateProducts(products, quantity, unit);
    if(productErrors.length > 0){
        errors = [...errors, ...productErrors];
    }

    if(steps !== null){
        if (!validateArray(steps)) {
            errors.push("Instruction steps can't be empty!")
        }
    }

    return errors;
}

/**
 * Function to validate given time format, input given from recipe creation select element
 * @param {string} timeFormat property of recipe
 * @returns true if format has been selected, false if format is still default
 */
const validateTimeFormat = (timeFormat) => {

    if(timeFormat === "Unit"){
        return false;
    }

    return true;
}

/**
 * Function to validate given name for recipe
 * @param {string} name property of recipe
 * @returns true if name is given and is not too long (50 characters), false if not given or too long
 */
export const validateName = (name) => {

    if (name.length > 0 && name.length <= 50) {
        return true;
    }

    return false;
}

/**
 * Function to validate if given value is number
 * @param {Number} userInput properties of recipe, portion count and prepping time
 * @returns true or false
 */
const validateNumber = (userInput) => {

    const value = Number(userInput);

    if (!isNaN(value) && value > 0) {
        return true;
    }

    return false;
}

/**
 * Function to validate that values in array are not null, undefined or zero in length 
 * @param {Array} array of items, such as products, quantities, units and instructions
 * @returns true or false
 */
const validateArray = (array) => {

    if(array.length === 0){
        return false;
    }

    let allInputsFound = true;

    array.forEach(item => {
        if (item === null || item === undefined || item.length === 0 || item === "Unit") {
            allInputsFound = false;
            return;
        }
    });

    return allInputsFound;
}

/**
 * Function to validate a dish
 * @param {Object} inputs properties of dish (name, course, array of components)
 * @returns array of errors from validation
 */
export const validateDish = (inputs) => {

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

/**
 * Function to validate all products
 * @param {Array} products array of products in recipe
 * @param {Array} quantity array of product quantities in recipe
 * @param {Array} unit array of product units in recipe
 * @returns array of errors from validation
 */
export const validateProducts = (products, quantity, unit) => {
    let errors = [];
    
    if (!validateArray(products)) {
        errors.push("Please enter name for products!")
    }

    if (!validateArray(quantity)) {
        errors.push("Please enter quantity for products!")
    }

    if (!validateArray(unit)) {
        errors.push("Please enter unit for products!")
    }

    return errors;
}
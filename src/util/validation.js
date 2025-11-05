
export const validateRecipe = (name, portions, time,
    timeFormat, products, quantity, unit, steps) => {

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

const validateTimeFormat = (timeFormat) => {

    if(timeFormat === "Unit"){
        return false;
    }

    return true;
}

export const validateName = (name) => {

    if (name.length > 0 && name.length <= 50) {
        return true;
    }

    return false;
}

const validateNumber = (userInput) => {

    const value = Number(userInput);

    if (!isNaN(value) && value > 0) {
        return true;
    }

    return false;
}

const validateArray = (array) => {

    if(array.length === 0){
        return false;
    }

    let allInputsFound = true;

    array.forEach(element => {
        if (element === null || element === undefined || element.length === 0 || element === "Unit") {
            allInputsFound = false;
            return;
        }
    });

    return allInputsFound;
}

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
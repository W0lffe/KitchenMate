
export const validateAll = (name, portions, time,
    timeFormat, products, quantity, unit, steps) => {

    let errors = [];

    if (!validateRecipeName(name)) {
        errors.push("Recipe name is invalid")
    }

    if (!validateNumber(portions)) {
        errors.push("Please enter portion quantity!")
    }

    if (!validateNumber(time)) {
        errors.push("Please enter prep time!")
    }

    if(!validateTimeFormat(timeFormat)){
        errors.push("Please select prep time format!")
    }

    if (!validateArrays(products)) {
        errors.push("Please enter name for products!")
    }

    if (!validateArrays(quantity)) {
        errors.push("Please enter quantity for products!")
    }

    if (!validateArrays(unit)) {
        errors.push("Please enter unit for products!")
    }

    if (!validateArrays(steps)) {
        errors.push("Instruction steps can't be empty!")
    }

    return errors;
}

const validateTimeFormat = (timeFormat) => {

    if(timeFormat === "Unit"){
        return false;
    }

    return true;
}

const validateRecipeName = (name) => {

    if (name.length > 0 && name.length <= 30) {
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

const validateArrays = (array) => {

    let allInputsFound = true;

    array.forEach(element => {
        if (element === null || element === undefined || element.length === 0 || element === "Unit") {
            allInputsFound = false;
            return;
        }
    });

    return allInputsFound;
}

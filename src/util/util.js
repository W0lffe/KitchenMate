import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faClock, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";


const slogans = [
    "Cook Smarter, Not Harder with KitchenMate.",
    "Your Culinary Companion for Every Meal.",
    "Simplify Your Cooking with KitchenMate.",
    "From Prep to Plate.",
    "Where Great Meals Begin – KitchenMate."
];

export const units = [ 
    "kg", "l", "g", "dl", "pcs"
]

export const getRandomSlogan = () => {
    return slogans[Math.floor(Math.random() * slogans.length)];
}

export const getToolbarLabels = (isMobile) => {

    const labels = ["Name", "Prep Time", "Newest-Oldest", "Favorite"]
/* 
    if(isMobile){
        const icons = [
        <FontAwesomeIcon icon={faArrowDownAZ} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faClock} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400"/>,
        <FontAwesomeIcon icon={faStar} className="text-gray-400"/>,
        ]
        return icons;
    }
 */
    return labels;
}

export const validateRecipeName = (name) => {

    if(name.length > 0 && name.length <= 30){
        return true;
    }

    return false;
}

export const validateInteger = (userInput) => {

    const value = Number(userInput);

    if(Number.isInteger(value) && value > 0){
        return true;
    }
 
    return false;
}

export const validateArrays = (array) => {

    let allInputsFound = true;

    array.forEach(element => {
        if(element === null || element === undefined || element.length === 0 || element === "Unit"){
            allInputsFound = false;
            return;
        }
    });

    return allInputsFound;
}

export const combineProductData = (products, quantities, units) => {

    let combinedProducts = [];

    for(let i = 0; i < products.length; i++){
        const combinedProduct = {
            product: products[i],
            quantity: quantities[i],
            unit: units[i]
        }
        combinedProducts.push(combinedProduct);
    }

    return combinedProducts;
}

export const getTimestamp = () => {

    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();    
    return formattedDate;
}



import { LIST_LABELS, SLOGANS }from "./constants.js";

/**
 * Get the labels for a specific list
 * @param {number} activeList wich section is active
 * @returns labels for the active list
 */
export const getListLabels = (activeList)=> {

    return LIST_LABELS[activeList] || [];
}

/**
 * Get a random slogan for the header
 * @returns a slogan
 */
export const getRandomSlogan = () => {
    return SLOGANS[Math.floor(Math.random() * SLOGANS.length)];
}
/**
 * Function to combine product, quantity, and unit arrays into a single array of objects
 * @param {string} products 
 * @param {number} quantities 
 * @param {string} units 
 * @returns {Array} combined array of objects
 */
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

/**
 * Function to get the reducer action type based on method, section, and basketAdd flag
 * @param {string} method 
 * @param {string} section 
 * @param {boolean} basketAdd 
 * @returns {string} action type for reducer
 */
export const getReducerType = (method, section, basketAdd) => {

    switch (section) {
        case "recipes":
            if (method === "POST" && basketAdd) return "ADD_BASKET_ITEM";
            if (method === "POST" && !basketAdd) return "ADD_RECIPE";
            if (method === "PUT") return "UPDATE_RECIPE";
            if (method === "DELETE") return "REMOVE_RECIPE";
            break;
        case "dishes":
            if (method === "POST" && basketAdd) return "ADD_BASKET_ITEM";
            if (method === "POST" && !basketAdd) return "ADD_DISH";
            if (method === "PUT") return "UPDATE_DISH";
            if (method === "DELETE") return "REMOVE_DISH";
            break;
        case "basket":
            if (method === "POST") return "ADD_BASKET_ITEM";
            if (method === "DELETE") return "REMOVE_BASKET_ITEM";
            if (method === "PUT") return "UPDATE_BASKET_ITEM";
            break;
    }
}

/**
 * Function for scaling recipe ingredients based on portion changes
 * @param {Object} scaleParams 
 * @returns {Object} scaled recipe ingredients and portions
 */
export const scaleRecipe = (scaleParams) => {


    const {ingredients, operation, scaledTo, scaleTo} = scaleParams;
    const originalPortions = scaledTo;
    const originalIngredients = ingredients;
    
    let newPortions = 0;

    if(operation === "+"){
        newPortions = parseInt(originalPortions) + 1;
    }
    else if(operation === "-"){
        if(originalPortions === 1){
            newPortions = originalPortions;
        }
        else{
            newPortions = parseInt(originalPortions) - 1;
        }
    }

    if(scaleTo){
        newPortions = scaleTo;
    }

    const scaledIngredients = originalIngredients.map((ingredient) => ({
            product: ingredient.product, 
            quantity: ((ingredient.quantity / originalPortions) * newPortions).toFixed(1), 
            unit: ingredient.unit
        })
    );

    return {
        portions: newPortions,
        ingredients: scaledIngredients,
    };
}

/**
 * Function to get recipe information with ID numbers from a list
 * @param {Array} list list of all recipes
 * @param {Array} id list of ID's in dish components
 * @returns {Array} list of recipe information objects
 */
export const getRecipeInfo = (list, id) => {

    if(list.length === 0 || id.length === 0) return [];
    let recipes = []
    id.forEach(id => {
        let recipe = list.find(item => item.id === id);
        const {portions, ingredients} = scaleRecipe({
            ingredients: recipe.ingredients,
            scaledTo:  recipe.portions,
            scaleTo: 1
        })
        recipe = {
            ...recipe,
            ingredients,
            portions
        }
        recipes.push(recipe);
    });

    return recipes;
}

/**
 * Function to find dishes that depend on a specific recipe
 * @param {number} recipeID id of recipe item
 * @param {Array} dishes list of all dishes
 * @returns {Array} list of dish IDs that depend on the recipe
 */
export const findRecipeDependencies = (recipeID, dishes) => {
    console.log(dishes)
    const dependencies = [];

    if(dishes.length === 0){
        return dependencies;
    }

    dishes.forEach(dish => {
        const dishComponents = dish.components;
        const includes = dishComponents.includes(recipeID);
        if(includes){
            dependencies.push(dish.id)
        }
    });

    return dependencies;
}



/**
 * Slogans for the header section
 */
const slogans = [
    "Plan, organize, and cook smarter — all in one place.",
    "Simplify Your Cooking with KitchenMate.",
    "From idea to plate — manage recipes, ingredients, and dishes effortlessly."
];

/**
 * Units for ingredients
 */
export const units = {
    "metric": [ "kg", "g", "mg", "L", "dL", "mL", "tbsp", "tsp", "pcs"],
    "imperial": [ "oz", "lb", "gal", "qt", "pt", "cup", "tbsp", "tsp", "pcs"]
} 

/**
 * Labels for navigation
 */
export const nav_labels = {
    "home": ["Recipes", "Meals", "Basket"],
    "professional": ["Recipes", "Dishes", "Basket"]
}

/**
 * Output types for recipes
 */
export const outputs = {
  "N/A": [],
  "GN": ["GN 1/6-10", "GN 1/6-15", "GN 1/3-10", "GN 1/3-15", "GN 1/2-10", "GN 1/2-15", "GN 1/1-10", "GN 1/1-15", "GN 1/1-6.5"],
  "Piping": ["6L Piping"],
  "Box": ["0.5L Box", "1L Box", "2L Box", "3L Box"]
};

/**
 * Courses for dishes
 */
export const courses = {
    "home": ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
    "professional": ["Amuse-bouche", "Appetizer", "Starter", "Main", "Sides", "Dessert", "Snack"]
}

/**
 * Labels for different lists
 */
const LIST_LABELS = {
    1: ["Name", "Prep Time", "View"],
    2: ["Name", "Components", "View"],
    3: ["Product", "Quantity", "Unit", "Collected", "Cut"],
    4: ["Name", "Add"],
};

/**
 * Categories for recipes
 */
export const categories = {
    "home": ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Baking", "Soup", "Snacks"],
    "professional": ["Stocks & Broths", "Sauce Bases", "Condiments", "Sauces", "Cold Sauces", "Marinades", 
                    "Meat", "Fish", "Vegetarian (protein)", "Vegetables", "Doughs", "Soups",
                    "Creams & Custards", "Baked Desserts", "Bread", "Garnish", "WiP", "Other" ]
}

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
    return slogans[Math.floor(Math.random() * slogans.length)];
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
 * Function to get the current timestamp in "YYYY-M-D" format
 * @returns {string} formatted date
 */
export const getTimestamp = () => {

    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();    
    return formattedDate;
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
 * Function to extract recipe form values from FormData
 * @param {FormData} formData 
 * @returns {Object} recipe form values
 */
export const getRecipeFormValues = (formData) => {
    const name = formData.get("name")
    const portions = formData.get("portions")
    const output = formData.get("output") ? formData.get("output") : "N/A";
    const outputType = formData.get("outputType")
    const time = formData.get("time")
    const timeFormat = formData.get("timeFormat")
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");
    const steps = formData.getAll("step");
    const category = formData.get("category");

    return{ name, portions, output, outputType, time, timeFormat, 
            products, quantity, unit, steps, category };
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

/**
 * To get dish form values from FormData
 * @param {FormData} formData 
 * @param {Object} state current form state, formData
 * @returns {Object} dish form values
 */
export const getDishFormValues = (formData, state) => {
    const name = formData.get("name");
    const course = formData.get("course");
    const image = formData.get("image");
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


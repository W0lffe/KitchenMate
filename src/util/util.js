
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

export const outputs = {
  "N/A": [],
  "GN": ["GN 1/6-10", "GN 1/6-15", "GN 1/3-10", "GN 1/3-15", "GN 1/2-10", "GN 1/2-15", "GN 1/1-10", "GN 1/1-15", "GN 1/1-6.5"],
  "Piping": ["6L Piping"],
  "Box": ["0.5L Box", "1L Box", "2L Box", "3L Box"]
};

export const courses = [
    "Starter", "Main", "Dessert", "Amuse-bouche", "Snack", "Lunch", "Dinner", "Breakfast"
]

const LIST_LABELS = {
    1: ["Name", "Portions", "Prep Time", "View"],
    2: ["Name", "Course", "Components", "View"],
    3: ["Product", "Quantity", "Unit", "Collected", "Cut"],
    4: ["Name", "Add"],
};

export const getListLabels = (activeList)=> {

    return LIST_LABELS[activeList] || [];
}

export const getRandomSlogan = () => {
    return slogans[Math.floor(Math.random() * slogans.length)];
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
    const formattedDate = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();    
    return formattedDate;
}


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
            if (method === "POST" && !!basketAdd) return "ADD_DISH";
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

export const scaleRecipe = (operation, recipe) => {

    const originalPortions = recipe.portions;
    const originalIngredients = recipe.ingredients;

    let newPortions;
    if(operation == "+"){
        newPortions = parseInt(originalPortions) + 1;
    }
    else{
        newPortions = parseInt(originalPortions) - 1;
    }

    const scaledIngredients = originalIngredients.map((ingredient) => ({
            product: ingredient.product, 
            quantity: (ingredient.quantity / originalPortions) * newPortions, 
            unit: ingredient.unit
        })
    );

    return {
        ...recipe,
        portions: newPortions,
        ingredients: scaledIngredients,
    };
}

export const getRecipeFormValues = (formData) => {
    const name = formData.get("name")
    const portions = formData.get("portions")
    const output = formData.get("output")
    const outputType = formData.get("outputType")
    const time = formData.get("time")
    const timeFormat = formData.get("timeFormat")
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");
    const steps = formData.getAll("step");

    return{ name, portions, output, outputType, time, timeFormat, 
            products, quantity, unit, steps };
}

export const getRecipeInfo = (list, id) => {

    if(list.length === 0 || id.length === 0) return [];

    let recipes = []
    id.forEach(id => {
        recipes.push(list.find(item => item.id === id));
    });

    return recipes;
}

export const getDishFromValues = (formData, state) => {
    const name = formData.get("name");
    const course = formData.get("course");
    const image = formData.get("image");
    const components = state?.validInputs?.components || [];
    return { name, course, image, components };
}

export const deriveFormStateValues = (state, isRecipe) => {
    if(isRecipe){
        const name = state.validInputs?.name || "";
        const portions = state.validInputs?.portions || 0;
        const output = state.validInputs?.output || "";
        const outputType = state.validInputs?.outputType || "";
        const time = state.validInputs?.time || 0;
        const timeFormat = state.validInputs?.timeFormat || null;
        const products = state.validInputs?.products || [];
        const quantity = state.validInputs?.quantity || [];
        const unit = state.validInputs?.unit || [];
        const steps = state.validInputs?.steps || [];
        return { name, portions, output, outputType, time, timeFormat, products, quantity, unit, steps };
    }
    else{
        const name = state.validInputs?.name || "";
        const course = state.validInputs?.course || "";
        const image = state.validInputs?.image || null;
        const components = state.validInputs?.components || [];
        return { name, course, image, components };
    }
};


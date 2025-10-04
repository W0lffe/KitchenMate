
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

export const outputs  = [
    "Portions", "GN 1/6-10", "GN 1/6-15", "GN 1/3-10", "GN 1/3-15", 
    "GN 1/2-10", "GN 1/2-15", "GN 1/1-10", "GN 1/1-15", "GN 1/1-6.5",
    "6L Piping"
]

export const courses = [
    "Starter", "Main", "Dessert", "Amuse-bouche",
]

export const getListLabels = (activeList)=> {

    switch(activeList){
        case "recipes":
            return ["Name", "Portions", "Prep Time", "View"]
        case "dishes":
            return [ "Name", "Course", "Components", "View"]
        case "basket":
            return ["Product", "Quantity", "Unit", "Collected", "Cut"]
    }
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

export const scaleRecipe = (operation, itemToScale) => {
    const recipe = itemToScale.recipe;

    const originalPortions = recipe.output.portions;
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
        ...itemToScale,
        recipe: {
            ...recipe,
            output: {
                ...recipe.output,
                portions: newPortions,
            },
            ingredients: scaledIngredients,
        },
    };
}

export const getFormValues = (formData) => {
    const name = formData.get("name")
    const portions = formData.get("portions")
    const output = formData.get("output")
    const time = formData.get("time")
    const timeFormat = formData.get("timeFormat")
    const products = formData.getAll("product");
    const quantity = formData.getAll("quantity");
    const unit = formData.getAll("unit");
    const steps = formData.getAll("step");

    return{ name, portions, output, time, timeFormat, 
            products, quantity, unit, steps };
}

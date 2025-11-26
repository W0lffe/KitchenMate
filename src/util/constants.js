/**
 * Slogans for the header section
 */
export const SLOGANS = [
    "Plan, organize, and cook smarter — all in one place.",
    "Simplify Your Cooking with KitchenMate.",
    "From idea to plate — manage recipes, ingredients, and dishes effortlessly."
];

/**
 * Units for ingredients
 */
export const UNITS = {
    "metric": [ "kg", "g", "mg", "L", "dL", "mL", "tbsp", "tsp", "pcs"],
    "imperial": [ "oz", "lb", "gal", "qt", "pt", "cup", "tbsp", "tsp", "pcs"]
} 

/**
 * Labels for navigation
 */
export const NAV_LABELS = {
    "home": ["Recipes", "Meals", "Basket"],
    "professional": ["Recipes", "Dishes", "Basket"]
}

/**
 * Output types for recipes
 */
export const OUTPUTS = {
  "N/A": [],
  "GN": ["GN 1/6-10", "GN 1/6-15", "GN 1/3-10", "GN 1/3-15", "GN 1/2-10", "GN 1/2-15", "GN 1/1-10", "GN 1/1-15", "GN 1/1-6.5"],
  "Piping": ["6L Piping"],
  "Box": ["0.5L Box", "1L Box", "2L Box", "3L Box"]
};

/**
 * Courses for dishes
 */
export const COURSES = {
    "home": ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
    "professional": ["Amuse-bouche", "Appetizer", "Starter", "Main", "Sides", "Dessert", "Snack"]
}

/**
 * Labels for different lists
 */
export const LIST_LABELS = {
    1: ["Name", "Prep Time", "View"],
    2: ["Name", "Components", "View"],
    3: ["Product", "Quantity", "Unit", "Collected", "Cut"],
    4: ["Name", "Add"],
};

/**
 * Categories for recipes
 */
export const CATEGORIES = {
    "home": ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Baking", "Soup", "Snacks"],
    "professional": ["Stocks & Broths", "Sauce Bases", "Condiments", "Sauces", "Cold Sauces", "Marinades", 
                    "Meat", "Fish", "Vegetarian (protein)", "Vegetables", "Doughs", "Soups",
                    "Creams & Custards", "Baked Desserts", "Bread", "Garnish", "WiP", "Other" ]
}
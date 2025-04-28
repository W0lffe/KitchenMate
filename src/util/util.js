const slogans = [
    "Cook Smarter, Not Harder with KitchenMate.",
    "Your Culinary Companion for Every Meal.",
    "Simplify Your Cooking with KitchenMate.",
    "From Prep to Plate.",
    "Where Great Meals Begin – KitchenMate."
];

export const getRandomSlogan = () => {
    return slogans[Math.floor(Math.random() * slogans.length+1)];
}
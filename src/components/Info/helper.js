import appImg from "../../assets/app.jpg";
import basketImg from "../../assets/basket.jpg";
import dishesImg from "../../assets/dishes.jpg";
import recipesImg from "../../assets/recipes.jpg";
import creationImg from "../../assets/recipeCreation.jpg";
import dishCardImg from "../../assets/dishCard.jpg";
import pcBasketImg from "../../assets/basketPC.jpg"
import pcCreation from "../../assets/creationPC.jpg"
import dishesPC from "../../assets/dishesPC.jpg"


const mobile = [appImg, recipesImg, creationImg, dishesImg, dishCardImg, basketImg];

const desktop = [pcCreation, dishesPC, pcBasketImg];

const headers = ["KitchenMate", "Recipes", "Dishes", "Basket"];

const briefs = [];

briefs.push(`KitchenMate is a smart food service solution designed for home cooks and professionals who want to make life easier. 
            It simplifies meal preparation through intelligent technology, offering convenient, high-quality cooking support that saves time while delivering delicious results.`);

briefs.push(`Recipe hub feature displays all your creations in organized, categorized lists — making it easy to browse, manage, and find the right recipe whenever you need it.`);

briefs.push(`Recipe creation feature lets you easily create your own recipes by setting ingredients, steps, and cooking instructions — giving you full control to customize and organize your favorite recipes.`);

briefs.push(`Dish hub feature lets you group multiple recipes into a single collection — allowing you to combine sides, mains, and more to create a complete dish or meal.`);

briefs.push(`Dish Creation feature lets you build a complete dish or meal by combining your existing recipes — making it easy to design multi-course meals or custom menu items.`);

briefs.push(`Basket feature lets you add your favorite recipes, dishes, or meals to one place — automatically generating a shopping list with all the ingredients you need.`);

export const setupInfo = () => {

    const infoData = [];

    for(let i = 0; i < briefs.length; i++){
        let header = null;
        let desktopImage = null;

        if(i === 0){
            header = headers[i];
        }
        else if(i === 1){
            header = headers[i]
            desktopImage = desktop[i-1];
        }
        else if(i === 3){
            header = headers[i-1]
            desktopImage = desktop[i-2];
        }
        else if(i === 5){
            header = headers[i-2]
            desktopImage = desktop[i-3];
        }

        infoData.push({
            header,
            mobile: mobile[i],
            desktopImage,
            brief: briefs[i]
        })
    }

    return infoData;
}



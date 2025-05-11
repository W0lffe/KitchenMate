import { basketList, recipeList, dishList } from "../../backend/dummy_data";
const URL = "";

export const postNewUser = async (user) => {

    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
        });

        if(!response.ok){
            throw new Error("Error occured posting new user")
        }
        const resData = await response.json();
        return resData;
        
    } catch (error) {
        return error;
    }
}

export const authenticateUser = async (user) => {

    try {
        const response = await fetch(`${URL}?user=${JSON.stringify(user)}`, {
            method: "GET",
        });

        if(!response.ok){
            throw new Error("Error occured authenticating user.")
        }
        const resData = await response.json();
        return resData;
        
    } catch (error) {
        return error;
    }
}

/*******************FETCH API****************/

export const fetchRecipes = async(user) => {

    return await fetchData(user, "recipes");
}

export const fetchDishes = async(user) => {

    return await fetchData(user, "dishes");

}

export const fetchBasket = async(user) => {

    return await fetchData(user, "basket");

}
const fetchData = async (user, endpoint) => {
/* 
    try {
        const response = await fetch(`${URL}?user=${JSON.stringify(user)}&endpoint=${JSON.stringify(endpoint)}`);
        
        if(!response.ok){
            throw new Error("Error occured while fetching data from ", endpoint);
        }

        const resData = await response.json();
        return resData;

    } catch (error) {
        return error;
    }
 */


    let response;

    if(endpoint === "recipes"){
        response = recipeList;
    }
    if(endpoint === "dishes"){
        response = dishList;
    }
    if(endpoint === "basket"){
        response = basketList
    }

    return response;
}

/*******************POST API****************/

export const postRecipes = async(user, data) => {

    return await postData(user, data, "recipes");
}

export const postDishes = async(user, data) => {

    return await postData(user, data, "dishes");
}

export const postBasket = async(user, data) => {

    return await postData(user, data, "basket");
}

const postData = async (user, data, endpoint) => {
    
        try {
            const response = await fetch(`${URL}?user=${JSON.stringify(user)}&endpoint=${JSON.stringify(endpoint)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application-json"
                },
                body: JSON.stringify(data)
            });
            
            if(!response.ok){
                throw new Error("Error occured while posting data to ", endpoint);
            }
    
            const resData = await response.json();
            return resData;
    
        } catch (error) {
            return error;
        }
}

/*******************DELETE API****************/
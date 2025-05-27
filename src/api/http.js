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


export const basketAPI = async(data) => fetchAPI({...data, endpoint: "basket"});
export const dishesAPI = async(data) => fetchAPI({...data, endpoint: "dishes"});
export const recipesAPI = async(data) => fetchAPI({...data, endpoint: "recipes"});

const fetchAPI = async(params) => {

    const { user, data, method = "GET", endpoint } = params;
 
    /*
    const content = method !== "GET" ? {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    :
    { method };
   
    console.log(content);

   try {
        const response = await fetch(`${URL}?user=${JSON.stringify(user)}&endpoint=${JSON.stringify(endpoint)}`, content);
        
        if(!response.ok){
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.status}`);
        }

        const resData = await response.json();
        return resData;

    } catch (error) {
        return {error: error.message};
    } */

    if(endpoint === "basket"){
        return basketList;
    }
    if(endpoint === "recipes"){
        return recipeList;
    }
    if(endpoint === "dishes"){
        return dishList;
    }
}


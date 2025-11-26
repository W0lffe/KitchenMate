
export const BASE_URL = "https://www.cc.puv.fi/~e2301740/KitchenMate/public"; //for public
//export const BASE_URL = "http://192.168.50.135:8001"; //local
//export const BASE_URL = "http://100.121.222.40:8000"; //tailscale

import { createRequestPayload } from "../src/api/helper";

const delay = (msg) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(msg);
        resolve()
    }, 1000);
});


export const REFACTOR = async () => {

    
    console.log(dishes);

   for(const dish of dishes){
        const param = {
            data: dish,
            method: "POST",
            endpoint: "dishes"
        }
        console.log(param)
        //refactorRecipe(param);
        await delay("Dish input");
    };
    

}

const refactorRecipe = async (params) => {
     const payload = createRequestPayload(params);
    
        const { method = "GET", endpoint } = params;
    
        const fetchUrl = method === "GET"
            ? `${BASE_URL}/index.php?endpoint=${encodeURIComponent(endpoint)}`
            : `${BASE_URL}/index.php`;
    
        try {
            const response = await fetch(fetchUrl, payload);
    
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.error}`);
            }
    
            const resData = await response.json();
            return resData;
    
        } catch (error) {
            console.log(error)
            return { error: "Error occured while fetching data!" };
        }
}


//REFACTOR()



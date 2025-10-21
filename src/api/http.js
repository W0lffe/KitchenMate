import { BASE_URL } from "../../backend/api";

export const userAPI = async (data) => fetchAPI({...data, endpoint: "users"});
export const basketAPI = async (data) => fetchAPI({ ...data, endpoint: "basket" });
export const dishesAPI = async (data) => fetchAPI({ ...data, endpoint: "dishes" });
export const recipesAPI = async (data) => fetchAPI({ ...data, endpoint: "recipes" });

const fetchAPI = async (params) => {    

    console.log("params",params)

    const payload = createRequestPayload(params);

    console.log(payload);

    const { user, method = "GET", endpoint } = params;

    console.log(method, user, endpoint)

    const fetchUrl = method === "GET"
        ? `${BASE_URL}/index.php?user=${encodeURIComponent(user)}&endpoint=${encodeURIComponent(endpoint)}`
        : `${BASE_URL}/index.php`;

    console.log(fetchUrl);

    try {
        const response = await fetch(fetchUrl, payload);

        if (!response.ok) {
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.error}`);
        }

        const resData = await response.json();
        console.log(resData);
        return resData;

    } catch (error) {
        console.log(error);
        return { error: "Error occured while fetching data!" };
    }

}

const createRequestPayload = (params) => {

    const { user, data, method = "GET", endpoint } = params;
    
    if(method === "GET"){
        return {method}
    }

    const hasImage = data?.image instanceof File;

    if(hasImage){
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("user", user);
        formData.append("endpoint", endpoint);

        const dishData = {};
        for (const key in data) {
            if (key !== "image") {
                if (key !== "image"){
                    console.log(data[key]);
                    dishData[key] = data[key];
                    console.log(dishData);
                }
            }
        }
        
        formData.append("data",JSON.stringify(dishData));
        console.log(...formData.values());

        return {method, body: formData};
    }
    else{
        const jsonPayload = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user,
                endpoint,
                data
            })
       };

       return jsonPayload;
    }
}


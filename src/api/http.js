import { BASE_URL } from "../../backend/api";

export const userAPI = async (data) => fetchAPI({...data, endpoint: "users"});
export const basketAPI = async (data) => fetchAPI({ ...data, endpoint: "basket" });
export const dishesAPI = async (data) => fetchAPI({ ...data, endpoint: "dishes" });
export const recipesAPI = async (data) => fetchAPI({ ...data, endpoint: "recipes" });

const fetchAPI = async (params) => {    

    const payload = createRequestPayload(params);

    const { user, method = "GET", endpoint } = params;

    //console.log(method, user, endpoint)

    const fetchUrl = method === "GET"
        ? `${BASE_URL}/index.php?user=${encodeURIComponent(user)}&endpoint=${encodeURIComponent(endpoint)}`
        : `${BASE_URL}/index.php`;

    try {
        const response = await fetch(fetchUrl, payload);

        if (!response.ok) {
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.error}`);
        }

        const resData = await response.json();
        return resData;

    } catch (error) {
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

        if(method === "PUT"){
            formData.append("update", "true");
        }

        const dishData = {};
        for (const key in data) {
            if (key !== "image") {
                if (key !== "image"){
                    //console.log(data[key]);
                    dishData[key] = data[key];
                    //console.log(dishData);
                }
            }
        }
        
        formData.append("data",JSON.stringify(dishData));

        //console.log([...formData.values()]);

        return {method: "POST", body: formData};
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


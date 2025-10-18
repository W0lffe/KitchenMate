import { URL } from "../../backend/api";

export const userAPI = async (data) => {


    try {
        const response = await fetch(`${URL}/users.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error occured posting new user")
        }
        const resData = await response.json();
        return resData;

    } catch (error) {
        return { error: "Error occured while fetching data!" };
    }
}


export const basketAPI = async (data) => fetchAPI({ ...data, endpoint: "basket" });
export const dishesAPI = async (data) => fetchAPI({ ...data, endpoint: "dishes" });
export const recipesAPI = async (data) => fetchAPI({ ...data, endpoint: "recipes" });

const fetchAPI = async (params) => {

    const { user, data, method = "GET", endpoint } = params;

    const isGet = method === "GET";

    const content = !isGet ? {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user,
            endpoint,
            data
        })
    } : { method };

    const fetchUrl = isGet
        ? `${URL}/index.php?user=${encodeURIComponent(user)}&endpoint=${encodeURIComponent(endpoint)}`
        : `${URL}/index.php`;


    try {
        const response = await fetch(fetchUrl, content);

        if (!response.ok) {
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.error}`);
        }

        const resData = await response.json();
        return resData;

    } catch (error) {
        return { error: "Error occured while fetching data!" };
    }

}


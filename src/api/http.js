import { BASE_URL } from "../../backend/api";
import {createRequestPayload} from "./helper";

export const userAPI = async (data) => fetchAPI({...data, endpoint: "users"});
export const basketAPI = async (data) => fetchAPI({ ...data, endpoint: "basket" });
export const dishesAPI = async (data) => fetchAPI({ ...data, endpoint: "dishes" });
export const recipesAPI = async (data) => fetchAPI({ ...data, endpoint: "recipes" });

const fetchAPI = async (params) => {    

    const payload = createRequestPayload(params);

    const { method = "GET", endpoint } = params;

    const fetchUrl = method === "GET"
        ? `${BASE_URL}/index.php?endpoint=${encodeURIComponent(endpoint)}`
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

export const login = async () => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/login.php`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    })

    const resData = await response.json();
    return resData;
}



import { BASE_URL } from "../../backend/api";
import {createRequestPayload} from "./helper";

/**
 * Helper function to make requests to users endpoint
 * @param {Object} data includes data to send to server
 * @param {string} endpoint API endpoint, endpoint is defaulted to "users"
 * @returns response from server as json
 */
export const userAPI = async (data) => fetchAPI({...data, endpoint: "users"});
/**
 * Helper function to make requests to basket endpoint
 * @param {Object} data includes data to send to server
 * @param {string} endpoint API endpoint, endpoint is defaulted to "dishes"
 * @returns response from server as json
 */
export const basketAPI = async (data) => fetchAPI({ ...data, endpoint: "basket" });
/**
 * Helper function to make requests to dishes endpoint
 * @param {Object} data includes data to send to server
 * @param {string} endpoint API endpoint, endpoint is defaulted to "dishes"
 * @returns response from server as json
 */
export const dishesAPI = async (data) => fetchAPI({ ...data, endpoint: "dishes" });
/**
 * Helper function to make requests to recipes endpoint
 * @param {Object} data includes data to send to server
 * @param {string} endpoint API endpoint, endpoint is defaulted to "recipes"
 * @returns response from server as json
 */
export const recipesAPI = async (data) => fetchAPI({ ...data, endpoint: "recipes" });

/**
 * Used to make fetch requests to the server
 * @param {Object} params includes data, method, endpoint
 * @returns response from server as json
 */
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

/**
 * Used to verify token and get user info
 * @returns response from server as json
 */
export const login = async () => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/login.php`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    })

    const resData = await response.json();
    return resData;
}



import { BASE_URL } from "../../backend/api";
import { createRequestPayload } from "./helper";

/**
 * Helper function to make requests to users endpoint
 * @param {Object} data includes data to send to server
 * @param {string} endpoint API endpoint, endpoint is defaulted to "users"
 * @returns response from server as json
 */
export const userAPI = async (data) => fetchAPI({ ...data, endpoint: "users" });
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
    try {
        const response = await fetch(`${BASE_URL}/login.php`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        if (response.ok) {
            const resData = await response.json();
            return resData;
        }

        return null;
    } catch (error) {
        return { error: "Error occured while fetching user data!" };
    }

}

/**
 * Function to fetch image from server
 * @param {string} img image filename from dish object
 * @returns {Blob|Object} image blob or error message as object
 */
export const getImage = async (img) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${BASE_URL}/index.php?endpoint=image&image=${img}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })

        console.log("response",response);
        if (!response.ok) {
            //console.log(await response.json());
            //console.log(response.status);
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.error}`);
        }

        const blob = await response.blob();
        //console.log("blob type",blob.type);
        if(blob.type.includes("image")){
            //console.log("blob",blob);
            return blob;
        }
        else{
            const {error} = await response.json();
            //console.log("error fetching image",error);
            return {error};
        }
       

    } catch (error) {
        return { error: "Error occured while fetching image!" };
    }
}


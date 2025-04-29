
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
const URL = "http://localhost:8000";

export const userAPI = async (data) => {


     try {
        const response = await fetch(`${URL}/users.php`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error("Error occured posting new user")
        }
        const resData = await response.json();
        console.log(resData)
        return resData;
        
    } catch (error) {
        return {status: error.message};
    }
}



export const basketAPI = async(data) => fetchAPI({...data, endpoint: "basket"});
export const dishesAPI = async(data) => fetchAPI({...data, endpoint: "dishes"});
export const recipesAPI = async(data) => fetchAPI({...data, endpoint: "recipes"});

const fetchAPI = async(params) => {

    const { user, data, method = "GET", endpoint } = params;
    
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
        const response = await fetch(`${URL}/kitchenmate.php?user=${user}&endpoint=${endpoint}`, content);
        
        if(!response.ok){
            throw new Error(`Error occured, method: ${method}, endpoint: ${endpoint}, status: ${response.status}`);
        }

        const resData = await response.json();
        return resData.data;

    } catch (error) {
        return {error: error.message};
    } 

}


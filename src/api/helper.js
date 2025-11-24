
/**
 * Creates fetch request payload based on method and data.
 * @param {Object} params inlcuding data, method, endpoint
 * @returns {Object} Fetch request payload
 */
export const createRequestPayload = (params) => {

    const { data, method = "GET", endpoint } = params;
    
    const token = localStorage.getItem("token");
    if(method === "GET"){
        return { method,  headers: { Authorization: `Bearer ${token}` } };
    }

    const hasImage = (data?.image instanceof File && data?.image.size > 0) || 
                    (data?.userPayload?.image instanceof File && data?.userPayload?.image.size > 0);

    if(hasImage){
        const formData = new FormData();
        if(endpoint === "users"){
            formData.append("image", data.userPayload.image)
        }
        else{
            formData.append("image", data.image)
        }
        
        formData.append("endpoint", endpoint);

        if(method === "PUT"){
            formData.append("update", "true");
        }

        const newData = {};
        for (const key in data) {
            if (key !== "image") {
                newData[key] = data[key];
            }
        }
        
        formData.append("data",JSON.stringify(newData));

        //console.log([...formData.values()]);

        return {method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData};
    }
    else{
        const jsonPayload = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                endpoint,
                data
            })
       };

       return jsonPayload;
    }
}


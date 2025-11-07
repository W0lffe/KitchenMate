
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

    const hasImage = (data?.image instanceof File && data?.image.size > 0);

    if(hasImage){
        const formData = new FormData();
        formData.append("image", data.image);
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

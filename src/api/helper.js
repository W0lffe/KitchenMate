export const createRequestPayload = (params) => {

    const { data, method = "GET", endpoint } = params;
    
    if(method === "GET"){
        return {method,  credentials: 'include'  };
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

        return {method: "POST",  credentials: 'include',  body: formData};
    }
    else{
        const jsonPayload = {
            method,
            credentials: 'include', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                endpoint,
                data
            })
       };

       return jsonPayload;
    }
}

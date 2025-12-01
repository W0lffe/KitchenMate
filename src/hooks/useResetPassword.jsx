import { useCallback } from "react";
import { userAPI } from "../api/http";
import { handleToast } from "../util/toast";

export default function useResetPassword({handleRequest}){
    return useCallback( async (prevFormState, formData) => {

        const username = formData.get("username");
        const recCode = formData.get("code");
        const newPass = formData.get("passwd");

        const isReset = (newPass && (!username && !recCode)) ?? false;

        const userPayload = isReset ? { id: localStorage.getItem("id"), newPass } : 
                                    {  user: username, recCode  };

        const response = await userAPI({
            method: "POST",
            data: { userPayload, operation: isReset ? "reset" : "validate"}
        });

        //console.log(response)
        const {success, error, id, code} = response;

        if(error){
            handleToast({error});
            return isReset ? {success: true} : {};
        }

        if(!isReset) localStorage.setItem("id", id);
        if(isReset) localStorage.removeItem("id");
        handleToast({success});
        return isReset ? {code} : {success};

    }, [handleRequest])
}

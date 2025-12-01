import { useCallback } from "react";
import { userAPI } from "../api/http";
import { handleToast } from "../util/toast";

export default function useResetPassword({handleRequest}){
    return useCallback( async (prevFormState, formData) => {

        const username = formData.get("username");
        const recCode = formData.get("code");
        const newPass = formData.get("passwd");

        const isReset = (newPass && (!username && !recCode)) ?? false;

        console.log({username, recCode, newPass, isReset});

        const response = await userAPI({
            method: "POST",
            data: { user: username, recCode }
        });

        const {success, error} = response;

        if(error){
            handleToast({error});
            return {}
        }

        handleToast({success});
        return {success};

    }, [handleRequest])
}
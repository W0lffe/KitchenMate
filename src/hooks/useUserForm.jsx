import { useCallback } from "react";
import { userAPI, login } from "../api/http";
import { handleToast } from "../util/toast";
import { getUserFormValues } from "../util/formHelpers.js";

/**
 * Custom hook for login and signup actions
 * @param {Boolean} isLogin tells hook if its used for login or signup
 * @param {Function} setModalState used for setting modal state in context
 * @param {Function} setUser sets user to context from successfull login
 * @returns valid inputs from form, either null or with errors
 */
export default function useUserForm({ isLogin, setModalState, setUser }) {
    return useCallback(async (prevFormState, formData) => {

        const {user, passwd, image, cookType, unitType} = getUserFormValues(formData);
        
        let userPayload = {
            user,
            passwd
        }

        if(!isLogin){
            userPayload = {
                ...userPayload,
                image: image.size > 0 ? image : null,
                cookType,
                unitType
            }
        }

        //console.log(userPayload);

        const response = await userAPI({
            method: "POST",
            data: { userPayload, operation: isLogin ? "login" : "new" },
        });

        const { error, success, token } = response;

        handleToast({
            error,
            success: isLogin ? success : success?.msg,
            setModalState,
        })

        if(error){
            return {
                validInputs: {
                    user,
                    image,
                    cookType,
                    unitType
                }}
        }


        if (isLogin && success && token) {
            localStorage.setItem("token", token);
            const loginRes = await login();
            if (loginRes?.user) setUser(loginRes.user);
        }

        return isLogin ? { validInputs: { user } } : { success };
        
    }, [isLogin, setModalState, setUser])
}
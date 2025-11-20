import { useCallback } from "react";
import { userAPI, login } from "../api/http";
import { handleToast } from "../util/toast";

/**
 * Custom hook for login and signup actions
 * @param {Boolean} isLogin tells hook if its used for login or signup
 * @param {Function} setModalState used for setting modal state in context
 * @param {Function} setUser sets user to context from successfull login
 * @returns valid inputs from form, either null or with errors
 */
export default function useUserForm({ isLogin, setModalState, setUser }) {
    return useCallback(async (prevFormState, formData) => {
        const name = formData.get("username")
        const pass = formData.get("passwd")

        const user = {
            user: name,
            passwd: pass
        }

        //console.log(user);

        const response = await userAPI({
            method: "POST",
            data: { user, operation: isLogin ? "login" : "new" },
        });

        const { error, success, token } = response;

        handleToast({
            error,
            success,
            setModalState,
        })


        if (isLogin && success && token) {
            localStorage.setItem("token", token);
            const loginRes = await login();
            if (loginRes?.user) setUser(loginRes.user);
        }

        return { validInputs: { name } };
        
    }, [isLogin, setModalState, setUser])
}
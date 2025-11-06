import { useContext, 
        useActionState } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import Button from "../Buttons/Button";
import { userAPI, login } from "../../api/http";
import { containerStyle, 
        headerStyle, 
        headingStyle,
        formStyle,
        labelStyle,
        inputStyle} from "./loginStyles";
import { handleToast } from "../../util/toast";

export default function LoginSignupForm(){
    const {activeModal, setModalState, setUser} = useContext(KitchenContext);
    const isLogin = activeModal.section === "login";
    const userHeading = isLogin ? "Username:" : "Username (1-16 characters):";
    const passHeading = isLogin ? "Password:" : "Password (10-16 characters):";

    const loginSignup = async (prevFormState, formData) => {
        const name = formData.get("username")
        const pass = formData.get("passwd")

        const user = {
            user: name, 
            passwd: pass
        }

        const response = await userAPI({
            method: "POST",
            data: {user, operation: isLogin ? "login" : "new"},
        });

        const {error, success, token, tkn_err } = response;

        handleToast({
            error: tkn_err ? tkn_err : error,
            success,
            setModalState,
        })


        if(isLogin && success && token){
            localStorage.setItem("token", token);
            const {user, error} = await login();
            if(user) setUser(user);
        }

        return {validInputs: { name }};
    }

    const [formState, formAction] = useActionState(loginSignup , {validInputs: null});

    return(
        <div className={containerStyle}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>{isLogin ? "LOGIN" : "SIGNUP"}</h3>
                <Button use={"close"} />
            </header>
            <section>
                <form action={formAction} className={formStyle}>
                    <label className={labelStyle}>{userHeading}</label>
                    <input type="text" 
                            name="username" 
                            required
                            placeholder="Enter username" 
                            className={inputStyle}
                            defaultValue={formState.validInputs?.name}/>
                    <label className={labelStyle}>{passHeading}</label>
                    <input type="password" 
                            name="passwd" 
                            required
                            placeholder="Enter password" 
                            className={inputStyle} />
                    <Button use={"login"}/>
                </form>
            </section>
        </div>
    )
}
import { useContext, 
        useActionState } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import Button from "../Buttons/Button";
import { userAPI } from "../../api/http";
import { containerStyle, 
        headerStyle, 
        sectionStyle,
        headingStyle,
        formStyle,
        labelStyle,
        inputStyle} from "./loginStyles";
import toast from "react-hot-toast";

export default function LoginSignupForm(){
    const {activeModal, setModalState, setUser} = useContext(KitchenContext);
    const isLogin = activeModal === "login";
    const userHeading = isLogin ? "Username:" : "Username (1-16 characters):";
    const passHeading = isLogin ? "Password:" : "Password (10-16 characters):";

    const loginSignup = async (prevFormState, formData) => {
        const name = formData.get("username")
        const pass = formData.get("passwd")

        const user = {
            user: name, 
            passwd: pass
        }

        const response = await userAPI({user, method: isLogin ? "login" : "new"});
        const {error, success, id} = response;
     
        if(error){
            toast.error(error);
            return {
                validInputs: { name }
            }
        }

        toast.success(success);
        setTimeout(() => {
            setModalState(null);
            if(isLogin){
                setUser({name, id});
            }
        }, 1250);

        return {validInputs: { name }};
    }

    const [formState, formAction] = useActionState(loginSignup , {validInputs: null})

    return(
        <div className={containerStyle}>
            <header className={headerStyle}>
                <Button use={"close"} />
            </header>
            <section className={sectionStyle}>
                <h3 className={headingStyle}>{isLogin ? "LOGIN" : "SIGNUP"}</h3>
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
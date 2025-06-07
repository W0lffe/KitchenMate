import { useContext, 
        useActionState } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import SubmitButton from "../Buttons/SubmitButton";
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

    const loginSignup = async (prevFormState, formData) => {
        const name = formData.get("username")
        const pass = formData.get("passwd")

        const user = {
            user: name, 
            passwd: pass
        }

        const response = await userAPI({user, method: isLogin ? "login" : "new"});
        const {error, success, id} = response;
        //console.log(error, success, id);
     
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

        return {errors: null};
    }

    const [formState, formAction] = useActionState(loginSignup , {errors: null})

    return(
        <div className={containerStyle}>
            <header className={headerStyle}>
                <SubmitButton use={"close"} func={setModalState} />
            </header>
            <section className={sectionStyle}>
                <h3 className={headingStyle}>{activeModal === "login" ? "LOGIN" : "SIGNUP"}</h3>
                <form action={formAction} className={formStyle}>
                    <label className={labelStyle}>{activeModal === "login" ? "Username:" : "Username (unique):"}</label>
                    <input type="text" name="username" 
                                placeholder="Enter username" 
                                className={inputStyle}
                                defaultValue={formState.validInputs?.name}/>
                    <label className={labelStyle}>{activeModal === "login" ? "Password:" : "Password (8-16 characters):"}</label>
                    <input type="password" name="passwd" 
                                placeholder="Enter password" 
                                className={inputStyle} />
                    <SubmitButton use={"login"}/>
                </form>
            </section>
        </div>
    )
}
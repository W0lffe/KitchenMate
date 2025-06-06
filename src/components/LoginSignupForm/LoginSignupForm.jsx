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

        let errors = [];
        const response = await userAPI({user, method: isLogin ? "login" : "new"});

        const {error, success, id} = response;
        console.log(error, success, id);

        error ? errors.push(error) : null;
     
        if(errors.length > 0){
            return {
                errors,
                validInputs: { name }
            }
        }

        setTimeout(() => {
            setModalState(null);
            if(isLogin){
                setUser({name, id});
            }
        }, 1500);

        return {success};

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
                    {formState.errors?.map((error, i) => <p key={i}>{error}</p>)}
                    {formState.success? <p>{formState.success}</p> : null}
                    <SubmitButton use={"login"}/>
                </form>
            </section>
        </div>
    )
}
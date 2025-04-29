import { useContext, 
        useActionState } from "react";
import { KitchenContext } from "../../context/KitchenContext";
import SubmitButton from "../Buttons/SubmitButton";
import { postNewUser, 
        authenticateUser } from "../../api/http";
import { containerStyle, 
        headerStyle, 
        closeButtonStyle, 
        sectionStyle,
        headingStyle,
        formStyle,
        labelStyle,
        inputStyle} from "./loginStyles";

export default function LoginSignupForm(){
    const {activeModal, setModalState} = useContext(KitchenContext);

    const loginSignup = async (prevFormState, formData) => {
        const name = formData.get("username")
        const pass = formData.get("passwd")

        const user = {
            username: name, 
            passwd: pass
        }

        let errors = [];
        let response;

        if(activeModal === "login"){
            // send user object to api
            //response = await authenticateUser(user)
            errors.push("Invalid username or password!")
        }
        else{
            //response = await postNewUser(user)
            errors.push("Username does not contain valid characters!")
        }
     
        if(errors.length > 0){
            return {errors}
        }

        return {errors: null};

    }

    const [formState, formAction] = useActionState(loginSignup , {errors: null})

    return(
        <div className={containerStyle}>
            <header className={headerStyle}>
                <button className={closeButtonStyle} onClick={() => setModalState("")}>X</button>
            </header>
            <section className={sectionStyle}>
                <h3 className={headingStyle}>{activeModal === "login" ? "LOGIN" : "SIGNUP"}</h3>
                <form action={formAction} className={formStyle}>
                    <label className={labelStyle}>{activeModal === "login" ? "Username:" : "Username (unique):"}</label>
                    <input type="text" name="username" placeholder="Enter username" className={inputStyle}/>
                    <label className={labelStyle}>{activeModal === "login" ? "Password:" : "Password (8-16 characters):"}</label>
                    <input type="password" name="passwd" placeholder="Enter password" className={inputStyle} />
                    {formState.errors?.map((error, i) => <p key={i}>{error}</p>)}
                    <SubmitButton />
                </form>
            </section>
        </div>
    )
}
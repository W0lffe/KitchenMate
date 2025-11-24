import { useActionState } from "react";
import Button from "../Buttons/Button";
import {
    headerStyle,
    headingStyle,
    formStyle,
    labelStyle,
} from "../LoginForm/loginStyles";
import { buttonStyle, containerStyle, fieldStyle, welcomeStyle } from "./signupFormStyles";
import useUserForm from "../../hooks/useUserForm";
import PrefPanel from "../PrefPanel/PrefPanel";
import Photo from "../Image/Photo";
import CredInput from "../CredInput/CredInput";
import { useNavigate } from "react-router-dom";

/**
 * Used for both signup form.
 * @returns component UI for signup form
 */
export default function SignupForm() {

    /**
     * Form action handler for signup, using custom hook
     * @param {FormData} formData contains user input data
     * @returns valid inputs to update form state
     */
    const signup = useUserForm({
        isLogin: false,
    })

    const navigate = useNavigate();

    const [formState, formAction] = useActionState(signup, { validInputs: null });

    return (
        formState.success ? (
            <div className={containerStyle + " gap-5 text-lg"}>
                <h2 className={welcomeStyle}>Welcome, chef!</h2>
                <p>Thank you for signing up! Your account is all set. Time to start cooking up something great!</p>
                <p>Below is your account recovery code. Please keep it in a safe place in case you ever need to reset your password.</p>
                <fieldset className={fieldStyle}>
                    <legend className="p-2 font-semibold">Recovery Code</legend>
                        <label className="font-semibold text-xl p-2">{formState.success.code}</label>
                </fieldset>
                <button onClick={() => navigate("/app")} className={buttonStyle}>Begin Your KitchenMate Journey</button>
            </div>
        ) : (
            <div className={containerStyle}>
                <header className={headerStyle}>
                    <h3 className={headingStyle}>Sign Up</h3>
                </header>
                <section>
                    <form action={formAction} className={formStyle}>
                        <section className="flex justify-center w-full h-fit m-1">
                            <Photo img={formState.validInputs?.image}/>
                        </section>
                        <label className={labelStyle + " gap-5"}>Username (1-16 characters)</label>
                        <CredInput isPass={false} state={formState} />
                        <label className={labelStyle + " gap-5"}>Password (10-16 characters)</label>
                        <CredInput isPass={true} />
                        <PrefPanel state={formState}/>
                        <footer className="flex w-full justify-center">
                            <Button use={"login"} />
                        </footer>
                    </form>
                </section>
            </div>
        )

    )
}
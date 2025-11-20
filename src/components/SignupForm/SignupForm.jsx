import { useActionState } from "react";
import Button from "../Buttons/Button";
import {
    containerStyle,
    headerStyle,
    headingStyle,
    formStyle,
    labelStyle,
} from "../LoginForm/loginStyles";
import useUserForm from "../../hooks/useUserForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import PrefPanel from "../PrefPanel/PrefPanel";

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

    const [formState, formAction] = useActionState(signup, { validInputs: null });

    return (
        <div className={containerStyle}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>Register</h3>
            </header>
            <section>
                <form action={formAction} className={formStyle}>
                    <label className={labelStyle}>
                        Username 
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </label>
                    <CredInput isPass={false} state={formState} />
                    <label className={labelStyle}>
                        Password
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </label>
                    <CredInput isPass={true} />
                    <PrefPanel />
                    <Button use={"login"} />
                </form>
            </section>
        </div>
    )
}
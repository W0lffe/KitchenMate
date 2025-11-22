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
import Photo from "../Image/Photo";
import CredInput from "../CredInput/CredInput";

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
        <div className={"w-[calc(100%-10px)] md:max-w-86 p-5 bg-white/90 h-fit flex flex-col justify-center items-center border rounded-custom-med "}>
            <header className={headerStyle}>
                <h3 className={headingStyle}>Register</h3>
            </header>
            <section>
                <form action={formAction} className={formStyle}>
                    <section className="flex justify-center w-full h-fit m-1">
                        <Photo />
                    </section>
                    <label className={labelStyle + " gap-5"}>Username (1-16 characters)</label>
                    <CredInput isPass={false} state={formState} />
                    <label className={labelStyle + " gap-5"}>Password (10-16 characters)</label>
                    <CredInput isPass={true} />
                    <PrefPanel />
                    <footer className="flex w-full justify-center">
                        <Button use={"login"} />
                    </footer>
                </form>
            </section>
        </div>
    )
}
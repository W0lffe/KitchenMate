import { containerStyle, 
        headerStyle, 
        headingStyle,
        formStyle,
        labelStyle } from "./loginStyles";
import { KitchenContext } from "../../context/KitchenContext";
import { useContext, useActionState } from "react";
import useUserForm from "../../hooks/useUserForm";
import Button from "../Buttons/Button";
import CredInput from "../CredInput/CredInput";

export default function LoginForm(){

    const {setModalState, setUser} = useContext(KitchenContext);

    const login = useUserForm({
        isLogin: true,
        setModalState,
        setUser
    });

    const [formState, formAction] = useActionState(login , {validInputs: null});
    
    return(
            <div className={containerStyle}>
                <header className={headerStyle}>
                    <h3 className={headingStyle}>Login</h3>
                    <Button use={"close"} />
                </header>
                <section>
                    <form action={formAction} className={formStyle}>
                        <label className={labelStyle}>Username</label>
                        <CredInput isPass={false} state={formState}/>
                        <label className={labelStyle}>Password</label>
                        <CredInput isPass={true} />
                        <Button use={"login"}/>
                    </form>
                </section>
            </div>
        )
}
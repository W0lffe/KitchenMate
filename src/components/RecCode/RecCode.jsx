import { fieldStyle, labelStyle, legendStyle } from "./recStyles"
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../SignupForm/signupFormStyles";

export default function RecCode({code, buttonMsg}){

    const navigate = useNavigate();

    return(
        <>
            <p>Below is your account recovery code. Please keep it in a safe place in case you ever need to reset your password.</p>
            <fieldset className={fieldStyle}>
                <legend className={legendStyle}>Recovery Code</legend>
                <label className={labelStyle}>{code}</label>
            </fieldset>
            <button onClick={() => navigate("/app")} className={buttonStyle}>{buttonMsg}</button>
        </>
    )
}
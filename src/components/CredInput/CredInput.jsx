import { inputStyle } from "../LoginForm/loginStyles";
export default function CredInput({isPass, state}) {

    const defValue = !isPass ? state.validInputs?.name : undefined;

    return (
        <input type={isPass ? "password" : "text"}
            name={isPass ? "passwd" : "username"}
            required
            placeholder={isPass ? "Enter password" : "Enter username"}
            className={inputStyle}
            defaultValue={defValue} />
    )
}
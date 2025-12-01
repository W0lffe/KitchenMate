import CredInput from "../components/CredInput/CredInput";
import Button from "../components/Buttons/Button";
import { inputStyle, labelStyle } from "../components/LoginForm/loginStyles";
import { useActionState, useContext } from "react";
import { KitchenContext } from "../context/KitchenContext";
import useResetPassword from "../hooks/useResetPassword";
import RecCode from "../components/RecCode/RecCode";

export default function ResetPassword(){
    const {handleRequest} = useContext(KitchenContext);
    const resetPassword = useResetPassword({handleRequest});
    const [formState, formAction] = useActionState(resetPassword , {});

    if(formState?.code){
        return(
            <div className="w-full h-full flex items-center justify-center text-black">
                <section className="bg-white/90 flex items-center justify-center flex-col p-6 gap-5 border rounded-custom-low">
                    <h3 className="font-semibold">Password changed successfully!</h3>
                    <RecCode code={formState.code} buttonMsg={"Back to App"}/>
                </section>
            </div>
        )
    }
    
    return(
        <div className="w-full h-full flex items-center justify-center text-black">
            <div className="bg-white/90 flex items-center justify-center flex-col p-6 gap-5 border rounded-custom-low">
                <h2 className="text-xl font-bold">Reset Password</h2>
                <form action={formAction} className="flex flex-col gap-3 items-center">
                    {formState?.success ? (
                        <>
                            <label className={labelStyle}>Enter new password</label>
                            <CredInput isPass={true} state={{}} />
                        </>
                    ) : (
                        <>
                            <label className={labelStyle}>Enter username</label>
                            <CredInput isPass={false} state={{}} />
                            <label className={labelStyle}>Enter recovery code</label>
                            <input type="text" 
                                    placeholder="Enter your code" 
                                    className={inputStyle} 
                                    required
                                    name="code"
                            />
                        </>
                    )}
                    <Button use={"login"} />
                </form>
            </div>
        </div>
        )
    
}

//FkYEx-UvtIi
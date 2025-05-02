import { input } from "./instructionStyles";

export default function Instruction({step}){

    return(
        <div className="w-9/10">
            <input type="text" name="step" placeholder={step} className={input}/>
        </div>
    )
}
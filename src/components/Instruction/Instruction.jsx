import { input } from "./instructionStyles";

export default function Instruction({step, state, index}){

    return(
        <div className="w-9/10">
            <input type="text" name="step" 
                        placeholder={step} 
                        className={input} 
                        defaultValue={state?.validInputs?.steps[index]}/>
        </div>
    )
}
import { input } from "./instructionStyles";

export default function Instruction({step, state, index}){

    const validInputs = state.validInputs || {};

    return(
        <div className="w-9/10">
            <input type="text" name="step" 
                        placeholder={step} 
                        className={input} 
                        defaultValue={validInputs.steps[index]}/>
        </div>
    )
}
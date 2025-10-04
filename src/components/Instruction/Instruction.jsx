import { input } from "./instructionStyles";

export default function Instruction({step, state, index}){

    const validInputs = state.validInputs || {steps: []};

    return(
        <div className="w-9/10 pb-2">
            <input type="text" name="step" 
                        placeholder={step} 
                        className={input} 
                        defaultValue={validInputs.steps[index]}/>
        </div>
    )
}
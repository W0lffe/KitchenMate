import { input } from "./instructionStyles";


/**
 * Component for rendering a single instruction step input.
 * @param {string} step Placeholder text for the instruction step.
 * @param {Object} state Current form state containing valid inputs.
 * @param {number} index Index of the instruction step.
 * @returns 
 */
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
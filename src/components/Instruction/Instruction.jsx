import { input } from "./instructionStyles";


/**
 * Component for rendering a single instruction step input.
 * @param {string} stepNum Placeholder text for the instruction step.
 * @param {Object} step Current instruction to display.
 * @returns 
 */
export default function Instruction({stepNum, step, children}){

    const validInputs = step || {step: ""};

    return(
        <div className="w-full px-1 flex flex-row gap-1">
            <input type="text" name="step" 
                        placeholder={stepNum} 
                        className={input} 
                        defaultValue={validInputs.step}/>
            {children}
        </div>
    )
}
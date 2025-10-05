import { recipeInfoStyle, 
        lineStyle, 
        labelStyle, 
        getInputStyle } from "./recipeStyles"
import { outputs } from "../../util/util"
import { useState } from "react";

export default function RecipeInfoSection({state}){

    const validInputs = state.validInputs || {};
    const [selectedOutput, setSelectedOutput] = useState(() => {
        const output = validInputs?.output ? validInputs?.output: Object.keys(outputs)[0];
        return output;
    });
  
    return(
        <div className={recipeInfoStyle}>

            <span className={lineStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text" 
                        name="name" 
                        placeholder="Recipe Name"
                        className={getInputStyle(false)} 
                        defaultValue={validInputs.name}/>
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Portions:</label>
                <input type="number" 
                        name="portions" 
                        min="1"
                        placeholder="Amount" 
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.portions}/>        
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Output:</label>
                <select
                    name="output"
                    className={getInputStyle(true)}
                    defaultValue={validInputs.output}
                    onChange={e => setSelectedOutput(e.target.value)}
                >
                    {Object.keys(outputs).map((output, i) => <option key={i} value={output}>{output}</option> )}
                </select>
                {outputs[selectedOutput].length > 0 && 
                    <select name="outputType"
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.outputType} >
                        {outputs[selectedOutput].map((output, i) => <option key={i}>{output}</option> )}
                    </select>
                }
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Prep Time:</label>
                <input type="number" 
                        name="time"
                        min="1" 
                        placeholder="Preparation Time"  
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.time} />
                <select name="timeFormat" 
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.timeFormat} >
                    <option>Unit</option>
                    <option>minute(s)</option>
                    <option>hour(s)</option>
                </select>
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Category:</label>
                <select name="category" 
                        className={getInputStyle(true)} 
                        defaultValue={""} >
                    <option>Coming soon</option>
                </select>
            </span>

        </div>
    )
}
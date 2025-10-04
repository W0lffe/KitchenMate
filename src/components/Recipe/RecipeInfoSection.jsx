import { recipeInfoStyle, 
        lineStyle, 
        labelStyle, 
        getInputStyle } from "./recipeStyles"
import { outputs } from "../../util/util"

export default function RecipeInfoSection({state}){

    const validInputs = state.validInputs || {};

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
                <label className={labelStyle}>Output:</label>
                <input type="number" 
                        name="portions" 
                        min="1"
                        placeholder="Amount" 
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.portions}/>        
                <select name="output" 
                        className={getInputStyle(true)} 
                        defaultValue={validInputs.output}>
                        {outputs.map((output, i) => <option key={i}>{output}</option> )}
                </select>
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
        </div>
    )
}
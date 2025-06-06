import { recipeInfoStyle, 
        lineStyle, 
        labelStyle, 
        getInputStyle } from "./recipeStyles"
import { outputs } from "../../util/util"

export default function RecipeInfoSection({state}){

    return(
        <div className={recipeInfoStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text" name="name" 
                                placeholder="Recipe Name"
                                className={getInputStyle(false)} 
                                defaultValue={state.validInputs?.name}/>
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Output:</label>
                <input type="number" name="portions" 
                                placeholder="Amount" 
                                className={getInputStyle(true)} 
                                defaultValue={state.validInputs?.portions}/>
                <select name="output" className={getInputStyle(true)} defaultValue={state.validInputs?.output} >
                   {outputs.map((output, i) => <option key={i}>{output}</option> )}
                </select>
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Prep Time:</label>
                <input type="number" name="time" 
                                placeholder="Preparation Time"  
                                className={getInputStyle(true)} 
                                defaultValue={state.validInputs?.time} />
                <select name="timeFormat" className={getInputStyle(true)} defaultValue={state.validInputs?.timeFormat} >
                    <option>Unit</option>
                    <option>minute(s)</option>
                    <option>hour(s)</option>
                </select>
            </p>
        </div>
    )
}
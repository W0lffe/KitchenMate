import {
    recipeInfoStyle,
    lineStyle,
    labelStyle,
    getInputStyle
} from "./recipeStyles"
import { outputs } from "../../util/util"
import { useState } from "react";
import { categories } from "../../util/util";


/**
 * Used to display recipe information input fields
 * @param {Object} state current form state
 * @returns UI for recipe information section
 */
export default function RecipeInfoSection({ state, user }) {

    const validInputs = state.validInputs || {};
    const [selectedOutput, setSelectedOutput] = useState(() => {
        const output = validInputs?.output ? validInputs?.output : Object.keys(outputs)[0];
        return output;
    });

    return (
        <div className={recipeInfoStyle}>

            <span className={lineStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text"
                    name="name"
                    placeholder="Recipe Name"
                    className={getInputStyle(false)}
                    defaultValue={validInputs.name} />
            </span>
            {user.cookType === "professional" &&
                <span className={lineStyle}>
                    <label className={labelStyle}>Output:</label>
                    <select
                        name="output"
                        className={getInputStyle(false)}
                        defaultValue={validInputs.output}
                        onChange={e => setSelectedOutput(e.target.value)}
                    >
                        {Object.keys(outputs).map((output, i) => <option key={i} value={output}>{output}</option>)}
                    </select>
                    {outputs[selectedOutput].length > 0 &&
                        <select name="outputType"
                            className={getInputStyle(false)}
                            defaultValue={validInputs.outputType} >
                            {outputs[selectedOutput].map((type, i) => <option key={i}>{type}</option>)}
                        </select>
                    }
                </span>
            }

            <span className={lineStyle}>
                <label className={labelStyle}>Portions:</label>
                <input type="number"
                    name="portions"
                    min="1"
                    placeholder="Amount"
                    className={getInputStyle(false)}
                    defaultValue={validInputs.portions} />
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Prep Time:</label>
                <input type="number"
                    name="time"
                    min="1"
                    placeholder="Prep Time"
                    className={getInputStyle(true)}
                    defaultValue={validInputs.time} />
                <select name="timeFormat"
                    className={getInputStyle(false)}
                    defaultValue={validInputs.timeFormat} >
                    <option>Unit</option>
                    <option>minute(s)</option>
                    <option>hour(s)</option>
                </select>
            </span>

            <span className={lineStyle}>
                <label className={labelStyle}>Category:</label>
                <select name="category"
                    className={getInputStyle(false)}
                    defaultValue={validInputs.category} >
                    <option>Uncategorized</option>
                    {categories[user.cookType].map((category, i) => <option key={i}>{category}</option>)}
                </select>
            </span>
        </div>
    )
}
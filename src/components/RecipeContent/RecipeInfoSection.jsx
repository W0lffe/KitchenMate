import { recipeInfoStyle, 
        lineStyle, 
        labelStyle, 
        inputStyle } from "./recipeStyles"

export default function RecipeInfoSection({state}){

    return(
        <div className={recipeInfoStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text" name="name" className={inputStyle} defaultValue={state.validInputs?.name}/>
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Portions:</label>
                <input type="text" name="portions" className={inputStyle} defaultValue={state.validInputs?.portions}/>
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Prep Time:</label>
                <input type="text" name="time" className={inputStyle} defaultValue={state.validInputs?.time} />
            </p>
        </div>
    )
}
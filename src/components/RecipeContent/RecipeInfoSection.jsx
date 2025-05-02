import { recipeInfoStyle, 
        lineStyle, 
        labelStyle, 
        inputStyle } from "./recipeStyles"

export default function RecipeInfoSection(){

    return(
        <div className={recipeInfoStyle}>
            <p className={lineStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text" name="name" className={inputStyle}/>
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Portions:</label>
                <input type="text" name="portions" className={inputStyle} />
            </p>
            <p className={lineStyle}>
                <label className={labelStyle}>Prep Time:</label>
                <input type="text" name="time" className={inputStyle} />
            </p>
        </div>
    )
}
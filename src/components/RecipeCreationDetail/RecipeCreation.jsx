import { formTopDiv, imgSection, imgStyle, inputStyle, labelStyle, lineStyle, recipeInfoStyle } from "./recipeStyles";

export default function RecipeCreation(){
    return(
       <div className="h-full border border-red-400">
        <form action="">
            <div className={formTopDiv}>
                <section className={imgSection}>
                    <img src="" alt="THIS WILL BE IMAGE" className={imgStyle} />
                </section>
                <section className={recipeInfoStyle}>
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
                </section>
            </div>
            <div className="flex flex-col h-full lg:flex-row border border-green-300 text-white">
                <section className="max-h-50 h-100 lg:max-h-125 overflow-y-auto w-full lg:w-1/2 border border-amber-400">
                <label className={labelStyle}>Ingredients</label>
                <ul>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                    <li>Ingredient</li>
                </ul>
                </section>
                <section className="max-h-50 h-100 lg:max-h-125 overflow-y-auto w-full lg:w-1/2 border border-cyan-200">
                <label className={labelStyle}>Instrunctions</label>
                <ul className="">
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>
                    <li>Instruction</li>

                </ul>
                  
                </section>
            </div>
            <footer className="flex items-center justify-center m-5">
                <button>SUBMIT</button>
            </footer>
            </form>
        </div>
    )
}

export default function ItemInspectView({item}){
    const mode = item.mode;
    const recipe = item.recipe;

    return(
        <div className="flex flex-col gap-10 w-full h-full text-white">
            <section className="h-1/6 flex flex-col justify-center p-5">
                <h3>{recipe.name}</h3>
                <h3>{recipe.output.portions} {recipe.output.output}</h3>
                <h3>{recipe.prepTime.time} {recipe.prepTime.format}</h3>
            </section>
            <div className="h-5/6 flex flex-col lg:flex-row">
                <section className="flex flex-col items-center h-1/2 lg:h-full w-full">
                    <label>Ingredients</label>
                    <ul className="max-h-full border w-full lg:w-2/3 border-cyan-300 p-5 items-center flex flex-col gap-1 overflow-y-auto">
                        {recipe.ingredients.map((ingredient, i) => 
                            <li key={i} className="flex w-1/2 justify-between">
                                <label className="w-30">{ingredient.product}</label>
                                <label>{ingredient.quantity}</label>
                                <label>{ingredient.unit}</label>
                            </li>)}
                    </ul>
                </section>
                <section className="flex flex-col items-center h-1/2 lg:h-full w-full">
                    <label>Instructions</label>
                    <ul className="max-h-full border w-full lg:w-2/3 border-cyan-300 p-5 items-center flex flex-col gap-1 overflow-y-auto">
                        {recipe.instructions.map((step, i) => 
                            <li key={i}>{`${i+1}. ${step}`}</li>)}
                    </ul>
                </section>
            </div>
        </div>
    )
        
    
}
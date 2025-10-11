import { topSection } from "./inspectStyles";
import Scale from "../Scale/Scale";

export default function ItemInfoSection({isRecipe, item, scale, state}){

    const isPreview = state !== undefined;
    const gotItem = isPreview ? state.validInputs : item;

    const name = gotItem.name.length > 0 && gotItem.name;
    
    let outputString = ""
    if(gotItem.outputType !== null){
        outputString += `${gotItem.outputType}, `;
    }
    outputString += gotItem.portions > 0 ? `approx. ${gotItem.portions} portions` : "";

    const timeValue = isRecipe && `${gotItem.time} ${gotItem.timeFormat}`;
    
    const output = isRecipe ? ((gotItem.portions > 0 || gotItem.outputType !== null) && `Yield: ${outputString}`) : (gotItem.course !== "course" && `Course: ${gotItem.course}`);
    const prepTime = (isRecipe && gotItem.time > 0) && `Prep Time: ${timeValue}`;

    return(
        <div className={topSection}>
            <section className="w-full p-5 lg:p-6">
                <h2 className="text-2xl font-semibold italic">{name}</h2>

                {isRecipe ? (
                    <section className="flex flex-row gap-15">
                        <h3 className="text-lg">{output}</h3>
                    </section>) 
                : 
                    <h3 className="text-lg">{output}</h3>
                }
                <h3 className="text-lg">{prepTime}</h3>
                {isRecipe && <Scale scale={scale} /> }
            </section>

            {(!isRecipe && gotItem?.image) && (
                <section className="w-1/2">
                    <img src={gotItem.image} alt="Photo cant be displayed" className="w-54 rounded-[50px] border-gray-900/80 border-2" />
                </section>
            )}
        </div>
    )
}
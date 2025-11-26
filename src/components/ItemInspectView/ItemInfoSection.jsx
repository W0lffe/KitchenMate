import { detailSection, infoSection } from "./inspectStyles";
import Scale from "../Scale/Scale";
import Photo from "../Image/Photo";


/**
 * Component displaying information about the inspected item.
 * @param {boolean} isRecipe indicates if the item is a recipe
 * @param {Object} item item to display information for (dish or recipe)
 * @param {Object} scaleFunctions functions for scaling ingredients (only for recipes)
 * @param {Object} state current form state containing valid inputs 
 * @returns component UI for item information section
 */
export default function ItemInfoSection({isRecipe, item, scaleFunctions, state}){

    const itemToUse = state !== undefined ? state.validInputs : item;
    const name = itemToUse.name.length > 0 && itemToUse.name;

    //console.log("item to use", item)

    let outputString = ""
    if(itemToUse.outputType){
        outputString += `${itemToUse.outputType}, `;
    }
    outputString += itemToUse.portions > 0 ? `approx. ${itemToUse.portions} portions` : "";

    const timeValue = isRecipe && `${itemToUse.time} ${itemToUse.timeFormat}`;
    const output = isRecipe ? ((itemToUse.portions > 0 || itemToUse.outputType !== null) && `Yield: ${outputString}`) : (itemToUse.course !== "course" && `Course: ${itemToUse.course}`);
    const prepTime = (isRecipe && itemToUse.time > 0) && `Prep Time: ${timeValue}`;

    return(
        <div className={infoSection + `${isRecipe ? "flex-col" : "flex-row"}`}>
            <section className={detailSection + `${isRecipe ? " w-full" : " w-1/2"}`}>
                <h2 className="text-2xl font-semibold italic">{name}</h2>
                <h3 className="text-lg">{output}</h3>
                <h3 className="text-lg">{prepTime}</h3>
            </section>
            {(isRecipe && scaleFunctions) && <Scale itemToScale={item} scaleFunctions={scaleFunctions} /> }
            {(!isRecipe && itemToUse?.image) && (
                <Photo img={itemToUse.image} disable={true}/>
            )}
        </div>
    )
}
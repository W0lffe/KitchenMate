import { topSection } from "./inspectStyles";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ItemInfoSection({isRecipe, item, scale, state}){

    const isPreview = state !== undefined;
    const gotItem = isPreview ? state.validInputs : item;

    console.log("got item", gotItem);

    const name = gotItem.name.length > 0 ? gotItem.name : "Name not set";
    
    let outputValue = isRecipe && `${gotItem.portions} Portions`;
    gotItem.outputType !== null && (outputValue += `, ${gotItem.outputType}`);

    const timeValue = isRecipe && `${gotItem.time} ${gotItem.timeFormat}`;
    
    const output = isRecipe ? `Yield: ${outputValue}` : `Course: ${gotItem.course}`;
    const prepTime = isRecipe && `Prep Time: ${timeValue}`;

    return(
        <div className={topSection}>
            <section className="w-full p-5 lg:p-6">
                <h2 className="text-2xl font-semibold italic">{name}</h2>

                {isRecipe ? (
                    <section className="flex flex-row gap-15">
                        <h3 className="text-lg">{output}</h3>
                        {scale && 
                        <span className="flex flex-row gap-5 text-xl">
                            <h3>Scale: </h3>
                            <FontAwesomeIcon icon={faSquareMinus} 
                                                className="py-1"
                                                onClick={() => scale("-")}/>
                            <FontAwesomeIcon icon={faSquarePlus} 
                                                className="py-1"
                                                onClick={() => scale("+")}/>
                        </span> }
                    </section>) 
                : 
                <h3 className="text-lg">{output}</h3>}
                <h3 className="text-lg">{prepTime}</h3>
            </section>

            {!isRecipe && (
                <section className="w-1/2">
                    <img src={gotItem.image} alt="Photo cant be displayed" className="w-54 rounded-[50px] border-gray-900/80 border-2" />
                </section>
            )}
        </div>
    )
}
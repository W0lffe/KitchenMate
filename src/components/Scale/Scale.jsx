import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { scaleRecipe } from "../../util/util";

const getOutputOptions = (recipeOutput) => {

    if (recipeOutput.toLowerCase().includes("n/a")) {
        return ["portions"];
    }
    else {
        return ["portions", recipeOutput];
    }
}

export default function Scale({ itemToScale, setToViewState }) {
    const [expandState, setExpandState] = useState(false);
    const [scaledTo, setScaledTo] = useState({
        portions: itemToScale.portions,
        output: itemToScale.output
    })
    const selectRef = useRef(null);

    const handleChange = (e) => {
        if(e.toLowerCase().includes("portions")){
            setScaledTo({...scaledTo, portions: itemToScale.portions})
        }
        else{
            setScaledTo({...scaledTo, portions: 1})

        }
    }

    const handleScale = (operation) => {
        console.log(selectRef.current.value)
        const scaleParams = {
            ingredients: itemToScale.ingredients,
            operation,
            output: selectRef.current.value,
            scaledTo: scaledTo.portions
        }
        const {portions, ingredients} = scaleRecipe(scaleParams)
        setScaledTo({...scaledTo, portions})
        setToViewState(ingredients);
    }

    const expandString = `Click to ${expandState ? "Contract" : "Expand"}`;

    return (
        <div className={`flex flex-col items-start transition-all ease-in overflow-hidden duration-1000 ${expandState ? "max-h-50" : "max-h-5"}`}>
            <h3 onClick={() => setExpandState(prev => !prev)}>{expandString}</h3>
            {expandState && 
                <span className={`flex flex-row gap-5 transition-all duration-300 ease-in ${expandState ? "text-lg" : "text-sm"}`}>
                <FontAwesomeIcon icon={faSquareMinus}
                    className="py-1"
                    onClick={() => handleScale("-")} />
                <h3>{scaledTo.portions}</h3>
                <select name="output" ref={selectRef}
                        onChange={(event) => handleChange(event.target.value)}>
                    {
                        getOutputOptions(scaledTo.output).map((option, i) =>
                            <option key={i} value={option}>
                                {option}
                            </option>
                        )
                    }
                </select>
                <FontAwesomeIcon icon={faSquarePlus}
                    className="py-1"
                    onClick={() => handleScale("+")} />
            </span>
            }
            
        </div>
    )
}
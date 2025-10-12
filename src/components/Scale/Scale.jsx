import { faArrowRotateLeft, faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { scaleRecipe } from "../../util/util";

const getOutputOptions = (recipeOutput) => {

    if (recipeOutput.toLowerCase().includes("n/a")) {
        return ["portions"];
    }
    else {
        return ["portions", recipeOutput];
    }
}

export default function Scale({ itemToScale, scaleFunctions }) {
    const [expandState, setExpandState] = useState(false);
    const [scaledTo, setScaledTo] = useState({
        portions: itemToScale.portions,
    })
    const selectRef = useRef(null);

    const {setScaledState, reset, isScaled} = scaleFunctions;

    const handleChange = (e) => {
        isScaled && reset();
        e.toLowerCase().includes("portions") ? setScaledTo({...scaledTo, portions: itemToScale.portions}) : setScaledTo({...scaledTo, portions: 1});
    }

    useEffect(() => {
        if(!isScaled){
            const refValue = selectRef.current.value;
            refValue.toLowerCase().includes("portions") ? setScaledTo({portions: itemToScale.portions}) : setScaledTo({portions: 1});
        }
    },[isScaled])

    const handleScale = (operation) => {
        const scaleParams = {
            ingredients: itemToScale.ingredients,
            operation,
            scaledTo: scaledTo.portions
        }
        const {portions, ingredients} = scaleRecipe(scaleParams)
        setScaledTo({portions})
        setScaledState(ingredients);
    }

    const expandString = `Click to ${expandState ? "Contract" : "Expand"}`;

    return (
        <div className={`flex flex-col items-start p-1 gap-1`}>
            <h3 onClick={() => setExpandState(prev => !prev)}>{expandString}</h3>
            <span className={`flex flex-row gap-4 py-1 px-2 text-xl overflow-hidden transition-all ease-in-out duration-300 border-1 border-white/40 rounded-custom bg-gray-600/40 ${expandState ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                <FontAwesomeIcon icon={faSquareMinus}
                    className="py-1"
                    onClick={() => handleScale("-")} />
                <h3>{scaledTo.portions}</h3>
                <select name="output" ref={selectRef}
                        onChange={(event) => handleChange(event.target.value)} tabIndex={-1} className="focus:text-black">
                    {
                        getOutputOptions(itemToScale.output).map((option, i) =>
                            <option key={i} value={option}>
                                {option}
                            </option>
                        )
                    }
                </select>
                <FontAwesomeIcon icon={faSquarePlus}
                    className="py-1"
                    onClick={() => handleScale("+")} />
                <FontAwesomeIcon icon={faArrowRotateLeft}
                    className="py-1"
                    onClick={reset} />
            </span>
        </div>
    )
}
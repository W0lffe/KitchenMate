import { faArrowRotateLeft, faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { scaleRecipe } from "../../util/util";
import { containerStyle, spanStyle } from "./scaleStyles";

/**
 * Function to get output options for scaling
 * @param {string} recipeOutput given recipe output f.ex "n/a", "gn"
 * @returns {Array} list of possible output options
 */
const getOutputOptions = (recipeOutput) => {

    if (recipeOutput.toLowerCase().includes("n/a")) {
        return ["portions"];
    }
    else {
        return ["portions", recipeOutput];
    }
}

/**
 * Component for handling scaling of recipe ingredients
 * @param {Object} itemToScale item (recipe) to be scaled
 * @param {Object} scaleFunctions functions to handle scaling state
 * @returns Scaling UI component
 */
export default function Scale({ itemToScale, scaleFunctions }) {
    const [expandState, setExpandState] = useState(false);
    const [scaledTo, setScaledTo] = useState({
        portions: itemToScale.portions,
    })
    const selectRef = useRef(null);

    const {setScaledState, reset, isScaled} = scaleFunctions;

    /**
     * Handles change if output option is changed, resets scaling to match output
     * @param {string} e selected output option 
     */
    const handleChange = (e) => {
        isScaled && reset();
        e.toLowerCase().includes("portions") ? setScaledTo({...scaledTo, portions: itemToScale.portions}) : setScaledTo({...scaledTo, portions: 1});
    }

    useEffect(() => {
        if(!isScaled && itemToScale){
            setScaledTo({portions: itemToScale.portions})
            return;
        }

        if(!isScaled){
            const refValue = selectRef.current.value;
            refValue.toLowerCase().includes("portions") ? setScaledTo({portions: itemToScale.portions}) : setScaledTo({portions: 1});
        }

    },[isScaled, itemToScale])

    /**
     * Function to handle scaling operation
     * @param {string} operation add or subtract
     */
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

    const expandString = `Click to ${expandState ? "Hide" : "Show"}`;

    return (
        <section className={containerStyle}>
            <h3 onClick={() => setExpandState(prev => !prev)} className="cursor-pointer">{expandString}</h3>
            <span className={spanStyle + `${expandState ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                <FontAwesomeIcon icon={faSquareMinus}
                    className="py-1"
                    onClick={() => handleScale("-")} />
                <h3>{scaledTo.portions}</h3>
                <select name="output" ref={selectRef}
                        onChange={(event) => handleChange(event.target.value)} 
                        className="focus:text-black">
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
        </section>
    )
}
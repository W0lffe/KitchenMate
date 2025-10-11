import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Scale({scale}){
    const [expandState, setExpandState] = useState(false);
    const handleScale = (operation)  => {
        scale(operation);

    }

    const expandString = `Click to ${expandState ? "Contract" : "Expand"}`;

    return(
        <div className={`flex flex-col transition-all ease-in-out overflow-hidden ${expandState ? "max-h-fit" : "max-h-5"}`}>
            <h3 onClick={() => setExpandState(prev => !prev)}>{expandString}</h3>
            <span className="flex flex-row gap-5 text-xl">
                <h3>Scale: </h3>
                <FontAwesomeIcon icon={faSquareMinus} 
                                className="py-1"
                                onClick={() => handleScale("-")}/>
                <FontAwesomeIcon icon={faSquarePlus} 
                                className="py-1"
                                onClick={() => handleScale("+")}/>
            </span> 
        </div>
    )
}
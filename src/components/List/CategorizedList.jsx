import { useState } from "react";
import ListItem from "./ListItem";
import ListLabels from "./ListLabels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { categorizedListIconStyle, categorizedListSpanStyle, categorizedDivStyle, categorizedListStyle } from "./listStyles";

/**
 * Used to render categorized lists
 * @param {Object} group Group object containing group name and items 
 * @param {Array} useLabel Labels to use for the list
 * @returns UI for categorized list
 */
export default function CategorizedList({ group, useLabel }) {

    const [isOpen, setIsOpen] = useState(false);
    const itemCount = group.items.length;

    return (
        <div className={categorizedDivStyle}>
            <span className={categorizedListSpanStyle + `${isOpen && "animate-pulse"}`}>
                <h3>{`${group.group} (${itemCount})`}</h3>
                <FontAwesomeIcon icon={faChevronUp} 
                                onClick={() => setIsOpen(prev => !prev)}
                                className={categorizedListIconStyle + `${isOpen ? "rotate-0" : "rotate-180"}`}/>
            </span>
            <ul className={categorizedListStyle + `${isOpen ? "max-h-120 overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>
                <ListLabels useLabel={useLabel} />
                {group.items.map((item, j) => (
                    <ListItem key={j} item={item} />
                ))}
            </ul>
        </div>
    )
}
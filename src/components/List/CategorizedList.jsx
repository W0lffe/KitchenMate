import { useState } from "react";
import ListItem from "./ListItem";
import ListLabels from "./ListLabels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { categorizedListIconStyle, categorizedListSpanStyle, categorizedDivStyle, categorizedListStyle } from "./listStyles";


export default function CategorizedList({ group, useLabel }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={categorizedDivStyle}>
            <span className={categorizedListSpanStyle + `${isOpen && "animate-pulse"}`}>
                <h3>{group.group}</h3>
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
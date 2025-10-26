import { useState } from "react";
import ListItem from "./ListItem";
import ListLabels from "./ListLabels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


export default function CategorizedList({ group, useLabel }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col w-[calc(100%-10px)] items-center m-1 p-1">
            <span className={`flex flex-row w-full p-2 text-xl justify-between bg-gray-700/70 border-2 border-white/40 rounded-custom ${isOpen && "animate-pulse"}`}>
                <h3>{group.group}</h3>
                <FontAwesomeIcon icon={faChevronUp} 
                                onClick={() => setIsOpen(prev => !prev)}
                                className={`transition-all duration-250 ease-in-out ${isOpen ? "rotate-0" : "rotate-180"}`}/>
            </span>
            <ul
                className={`flex flex-col w-full transition-all duration-500 items-center
                        ease-in-out ${isOpen ? "max-h-104 overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"}
                        `}
            >
                <ListLabels useLabel={useLabel} />
                {group.items.map((item, j) => (
                    <ListItem key={j} item={item} />
                ))}
            </ul>
        </div>
    )
}
import { itemListStyle } from "./listStyles"
import ListItem from "./ListItem"
import ListLabels from "./ListLabels"

/**
 * Used to display a simple list of items without categorization
 * @param {Array} list List of items to display
 * @param {Array} useLabel which labels to use
 * @returns UI for the simple list component
 */
export default function SimpleList({ list, useLabel }) {

    return (
        <div className={itemListStyle}>
            <ListLabels useLabel={useLabel} />
            <ul className={itemListStyle}>
                {list.map((item, i) => (<ListItem key={i} item={item} />))}
            </ul>
        </div>
    )
}
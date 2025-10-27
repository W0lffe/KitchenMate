import { itemListStyle } from "./listStyles"
import ListItem from "./ListItem"
import ListLabels from "./ListLabels"

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
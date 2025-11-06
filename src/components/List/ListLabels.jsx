import { listHeadingStyle, nameHeadingStyle } from "./listStyles"
import { getListLabels } from "../../util/util"

/**
 * UI component to display labels for list items
 * @param {Array} useLabel which labels to use
 * @returns component with labels
 */
export default function ListLabels({useLabel}){

    return(
    <li className={listHeadingStyle}>
        {getListLabels(useLabel).map((label, i) =>
            <label key={i} className={i === 0 ? nameHeadingStyle : null}>{label}</label>
        )}
    </li>
    )

}
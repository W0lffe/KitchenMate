import { listHeadingStyle, nameHeadingStyle } from "./listStyles"
import { getListLabels } from "../../util/util"

export default function ListLabels({useLabel}){

    return(
    <li className={listHeadingStyle}>
        {getListLabels(useLabel).map((label, i) =>
            <label key={i} className={i === 0 ? nameHeadingStyle : null}>{label}</label>
        )}
    </li>
    )

}
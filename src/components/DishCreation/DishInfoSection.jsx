import { courses } from "../../util/util"
import {
    labelStyle,
    spanStyle,
    inputStyle,
    infoContainer,
    detailSection
} from "./dishCreationStyles"
import Photo from "../Image/Photo"

export default function DishInfoSection({ state }) {

    const validInputs = state.validInputs || {}

    return (
        <div className={infoContainer}>
            <Photo img={validInputs?.image} />
            <section className={detailSection}>
            <span className={spanStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text"
                    name="name"
                    placeholder="Dish Name"
                    className={inputStyle}
                    defaultValue={validInputs.name} />
            </span>
            <span className={spanStyle}>
                <label className={labelStyle}>Course:</label>
                <select name="course"
                    className={inputStyle}
                    defaultValue={validInputs.course}>
                    <option value="course">Select</option>
                    {courses.map((course) =>
                        <option value={course} key={course}>{course}</option>)}
                </select>
            </span>
             </section>
        </div>
    )
}
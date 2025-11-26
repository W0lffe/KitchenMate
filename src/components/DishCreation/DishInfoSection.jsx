import { courses } from "../../util/util"
import {
    labelStyle,
    spanStyle,
    inputStyle,
    infoContainer,
    detailSection
} from "./dishCreationStyles"
import Photo from "../Image/Photo"


/**
 * Component for displaying and editing dish information in DishCreation.
 * @param {Object} state - Current state of the dish form, either formState or currentFormValues, depends on context
 * @returns Dish information section component
 */
export default function DishInfoSection({ state, cookType }) {

    const validInputs = state.validInputs || {}
    const isProf = cookType === "professional";

    return (
        <div className={infoContainer}>
            <Photo img={validInputs?.image} />
            <section className={detailSection}>
            <span className={spanStyle}>
                <label className={labelStyle}>Name:</label>
                <input type="text"
                    name="name"
                    placeholder={`${isProf ? "Dish" : "Meal"} name`}
                    className={inputStyle}
                    defaultValue={validInputs.name} />
            </span>
            <span className={spanStyle}>
                <label className={labelStyle}>Course:</label>
                <select name="course"
                    className={inputStyle}
                    defaultValue={validInputs.course}>
                    <option value="course">Select</option>
                    {courses[cookType].map((course) =>
                        <option value={course} key={course}>{course}</option>)}
                </select>
            </span>
             </section>
        </div>
    )
}
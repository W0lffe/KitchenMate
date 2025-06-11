import { courses } from "../../util/util"
import { imageStyle } from "../ItemInspectView/inspectStyles"
import {labelStyle, 
        spanStyle, 
        inputStyle, 
        imageSection, 
        infoSection, 
        divStyle} from "./dishCreationStyles"

export default function DishInfoSection({state}){

    const validInputs = state.validInputs || {name: "", course: "", imamge: null}

    return(
        <div className={divStyle}>
            <section className={infoSection}>
                <span className={spanStyle}>
                    <label className={labelStyle}>Name:</label>
                    <input type="text" 
                            name="name" 
                            placeholder="Name for dish" 
                            className={inputStyle}
                            defaultValue={validInputs.name}/>
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
            <section className={imageSection}>
                {state.validInputs?.image ? 
                    <label htmlFor="image-upload">
                        <img src={validInputs.image} className={imageStyle} /> 
                    </label>
                    :
                    <label htmlFor="image-upload" 
                            className={inputStyle}>Upload Image</label> }
                <input type="file" 
                        id="image-upload" 
                        name="image" 
                        className="hidden w-0"
                        accept="image/*"
                        />
            </section>
        </div>
    )
}
import { courses } from "../../util/util"


export default function DishInfoSection(){
    return(
        <div className="flex flex-col lg:flex-row w-full p-2 gap-5 mt-1">
            <section className="flex flex-col lg:w-1/2 gap-2">
                <span className="flex flex-row gap-3">
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="Name for dish" />
                </span>
                <span className="flex flex-row gap-3">
                    <label>Course:</label>
                    <select>
                        <option value="course">Select course</option>
                        {courses.map((course) => <option value={course} key={course}>{course}</option>)}
                    </select>
                </span>
            </section>
            <section className="flex flex-row lg:w-1/2 gap-2">
                <label>Image:</label>
                <input type="file" />
            </section>
        </div>
    )
}
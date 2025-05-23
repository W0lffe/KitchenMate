import { courses } from "../../util/util"


export default function DishInfoSection(){
    return(
        <div>   
             <span>
                <label>Name:</label>
                <input type="text" name="name" placeholder="Name for dish" />
            </span>
             <span>
                <label>Course:</label>
                <select>
                    <option value="course">Select course</option>
                    {courses.map((course) => <option value={course} key={course}>{course}</option>)}
                </select>
            </span>
            
        </div>
    )
}
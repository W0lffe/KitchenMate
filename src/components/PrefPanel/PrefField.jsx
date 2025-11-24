import { useEffect, useState } from "react"

export default function PrefField({field, refresh}){

    const [isToggled, setIsToggled] = useState(false);

    const handleChange = (e) => {
        //console.log(e.target.value)
        if(e.target.value != null){
            setIsToggled(true)
        }
    }

    useEffect(() => { setIsToggled(false)}, [refresh]);

    return(
        <>
        <label className="font-semibold">{field.q}</label>
            <fieldset className={`border p-1 rounded-custom-low transition-all duration-300 ${isToggled ? "border-green-700 border-2" : "border-black"}`}>
                <legend className="p-1">Pick one</legend>
                <span className="flex justify-around">
                    <label className="flex gap-2">
                        <input type="radio" 
                                name={field.inputName} 
                                value={field.values[0]} 
                                required
                                onChange={(e) => handleChange(e)}
                        />
                        {field.labels[0]}
                    </label>
                    <label className="flex gap-2">
                        <input type="radio" 
                                name={field.inputName} 
                                value={field.values[1]} 
                                onChange={(e) => handleChange(e)}
                        />
                        {field.labels[1]}
                    </label>
                </span>
                <p className="italic text-sm">{field.p}</p>
            </fieldset>
        </>
    )
}
import PrefField from "./PrefField"

export default function PrefPanel({state}) {

    const fields = [
        {
            q: "Which one are you?",
            inputName: "cookType",
            values:  ["home", "professional"],
            labels: ["Home Cook", "Professional Cook"],
            p: "Used to customize your experience in the app.",
        },
        {
            q: "Which units would you like to use?",
            inputName: "unitType",
            values:  ["metric", "imperial"],
            labels: ["Metric", "Imperial"],
            p: "Choose your preferred measurement units.",
        }
    ]

    return(
        <div className="flex flex-col gap-3">
            {fields.map((field, i) => <PrefField key={i} field={field} refresh={state}/>)}
        </div>
    )
}
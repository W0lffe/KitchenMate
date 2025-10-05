import { getTabButtonStyle } from "./buttonStyles"

export default function TabButtons({sections, openTab, func}){

    return(
        <div className="flex gap-5 w-full justify-center h-15">
            {Object.values(sections).map((section, i) => (
                <button key={i} type="button" 
                        onClick={() => {func(section)}}
                        className={getTabButtonStyle(openTab === section)}>{i+1}</button>
                )
            )}
        </div>
    )
}
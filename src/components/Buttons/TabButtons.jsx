import { getTabButtonStyle } from "./buttonStyles"

/**
 * Component rendering tab buttons to switch between sections in creation mode
 * @param sections sections available as tabs given from parent component
 * @param {string}openTab currently open tab, used for styling purposes
 * @param {function} func function to change open tab in parent component
 * @returns  component rendering tab buttons
 */
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
import { naviButtonStyle } from "./buttonStyles";

/**
 * Used to render navigation buttons
 * @param {JSX}children icon component and label to render inside button  
 * @param {function}func function to execute on button click,
 * @param {string}value value to pass to func on button click   
 * @returns navigation button component
 */
export default function NaviButton({ children, func, value }) {
    
    return <button onClick={() => func(value)} className={naviButtonStyle}>
                {children}
            </button>
}
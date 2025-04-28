import { buttonStyle } from "./ButtonStyle";

export default function Button({children, func, value}){
    return <button onClick={() => func(value)}
                    className={buttonStyle}
                    >{children}</button>
}
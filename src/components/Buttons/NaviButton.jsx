import { naviButtonStyle } from "./ButtonStyle";

export default function NaviButton({children, func, value}){
    return <button onClick={() => func(value)}
                    className={naviButtonStyle}
                    >{children}</button>
}
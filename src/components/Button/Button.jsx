
export default function Button({children, func, value}){
    return <button onClick={() => func(value)}>{children}</button>
}
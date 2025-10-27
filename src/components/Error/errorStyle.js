export const getErrorStyle = (hasErrors) => {
    
    let style = ``

    style += hasErrors ? ` max-h-65 animate-pulse opacity-100 overflow-auto` : ` max-h-0 overflow-hidden opacity-0`

    return style;
}

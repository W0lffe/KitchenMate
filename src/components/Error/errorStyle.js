export const getErrorStyle = (hasErrors) => {
    
    let style = `transition-all list-disc`

    style += hasErrors ? ` max-h-100 animate-pulse opacity-100 overflow-auto` : ` max-h-0 overflow-hidden opacity-0`

    return style;
}

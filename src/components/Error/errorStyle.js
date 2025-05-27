export const getErrorStyle = (hasErrors) => {
    
    let style = `w-full flex flex-col justify-center items-center list-disc transition-all duration-1500 ease-out`

    style += hasErrors ? ` max-h-65 animate-pulse opacity-100 overflow-auto` : ` max-h-0 overflow-hidden opacity-0`

    return style;
}

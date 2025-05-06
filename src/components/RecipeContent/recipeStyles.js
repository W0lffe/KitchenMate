
export const getContainerStyle = (isMobile) => {
    let style = `w-full border border-white/40 flex flex-col rounded-[12px] overflow-y-auto`
    style += isMobile ? ` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950/70 h-[95%]` : " h-9/10 ";

    return style;
}

export const getErrorStyle = (hasErrors) => {
    
    let style = `w-full flex flex-col justify-center items-center list-disc transition-all duration-1500 ease-out`

    style += hasErrors ? ` max-h-65 animate-pulse opacity-100 overflow-auto` : ` max-h-0 overflow-hidden opacity-0`

    return style;
}

export const mobileHeadingStyle = `w-full text-center text-md font-medium m-2`;

export const recipeInfoStyle = `h-fit w-full flex flex-col justify-center items-start lg:p-2`;

export const lineStyle = `flex gap-6 m-2 items-center flex-row`;

export const labelStyle = `text-[16px] font-semibold`;

export const getInputStyle = (half) => {
    let style =  `border rounded-custom p-1 text-center
                    transition[background] duration-300 ease-out bg-gray-400/60 hover:bg-white/60
                    focus:bg-white/90 focus:text-black focus:border-black`
    style += half ? ` w-25 lg:w-30` : ` w-50`
    return style;
}


export const sectionStyle = `max-h-60 h-115 lg:max-h-115 w-full flex flex-col justify-between items-center 
                            lg:w-1/2 border border-white/40 rounded-[6px] bg-gray-400/10`

export const sectionContainerStyle = `flex flex-col h-full lg:flex-row gap-3`;

export const listStyle = `max-h-60 h-125 lg:max-h-125 overflow-y-auto w-full flex flex-col items-center`;

export const footerStyle = `flex items-center justify-center m-2`;
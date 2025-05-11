
export const containerStyle = `flex flex-col gap-5 w-full h-full text-white`;

export const topSection = `h-1/6 flex flex-col justify-center p-5 border-b-1 border-white/20 rounded-custom`;

export const bottomSection =  `h-5/6 flex flex-col lg:flex-row`;

export const listSection = `flex flex-col items-center h-1/2 lg:h-full w-full lg:w-1/2 border-b-1 border-white/20 lg:border-0 rounded-custom`;

export const getListStyle =  (list) => {

    let style = `max-h-full p-5 flex flex-col gap-1 overflow-y-auto`

    style += list === "ingredients" ? ` w-full items-center` : ` w-5/6 items-start`

    return style;
}

export const iconSpan = `flex flex-row justify-end items-center gap-6 mt-2 px-5`;

export const getIconStyle = (icon) => {
    
    let style = `text-2xl lg:text-3xl transition-all duration-300 ease-out`;

    style += icon === "del" ? ` hover:text-red-700` : ` hover:text-gray-400/30`

    return style;
}
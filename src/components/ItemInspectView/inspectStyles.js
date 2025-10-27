
export const containerStyle = ``;

export const topSection = ` `;

export const bottomSection =  ``;

export const listSection = ``;

export const getListStyle =  (list) => {

    let style = `max-h-full p-5 flex flex-col gap-1 overflow-y-auto`

    style += list === "ingredients" ? ` w-full items-center` : ` w-5/6 items-start`

    return style;
}

export const iconSpan = ``;

export const getIconStyle = (icon) => {
    
    let style = ``;

    style += icon === "del" ? ` hover:text-red-700` : ` hover:text-gray-400/30`
    style += icon === "fav" ? ` text-amber-400` : ` `; 

    return style;
}


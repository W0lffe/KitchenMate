
export const containerStyle = `text-white h-fit w-full`;

export const infoSection = `w-full h-fit flex md:flex-row p-1
                            border-custom-bggray border-b-1 rounded-b-custom-low `;

export const detailSection = `md:w-1/2 p-5 flex flex-col justify-center gap-1 lg:p-6`;

export const bottomSection =  `w-full flex flex-col md:flex-row h-fit `;

export const listSection = `flex flex-col w-full md:w-1/2 p-2 h-fit items-center`;

export const getListStyle =  (list) => {

    let style = `max-h-full p-5 flex flex-col gap-1 overflow-y-auto`

    style += list === "ingredients" ? ` w-full items-center` : ` w-5/6 items-start`

    return style;
}

export const topButtonBar = `w-full flex h-fit justify-end gap-5 py-2 px-5 border-custom-bggray border-b-1 rounded-custom-low`;

export const getIconStyle = (icon) => {
    
    let style = `text-2xl md:text-3xl hover:animate-pulse cursor-pointer`;

    style += icon === "del" ? ` hover:text-red-700` : ` hover:text-gray-400/30`
    style += icon === "fav" ? ` text-amber-400` : ` `; 

    return style;
}


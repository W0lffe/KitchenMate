export const listContainerStyle = `flex flex-col mt-2 w-full items-center max-h-[calc(100%-125px)] overflow-y-auto border-1 border-custom-whiteborder p-1 rounded-custom-low`;

export const listHeadingStyle = `flex justify-between w-full md:w-9/10 p-2 text-lg italic`;

export const itemListStyle = `flex flex-col w-full items-center`;

export const nameHeadingStyle = `w-25 lg:w-50`;

export const categorizedDivStyle = `flex flex-col w-[calc(100%-10px)] items-center m-1 bg-gray-700/70 border-1 rounded-custom-low`;

export const categorizedListSpanStyle = `flex flex-row w-full p-2 text-xl justify-between bg-gray-950/80 border-b-1 border-custom-whiteborder rounded-custom-low `;

export const categorizedListIconStyle = `transition-all duration-250 ease-in-out `;

export const categorizedListStyle = `flex flex-col px-1 w-full transition-all transition-discrete delay-200 duration-500 items-center
                        ease-in-out `;



export const getListItemStyle = (isMobile, obtained, inComponents) => {

    let style = `h-fit flex justify-between items-center border bg-custom-bggray 
                mb-3 p-3 md:p-3 font-medium rounded-custom-low hover:bg-gray-700/40`;
    style += (obtained || inComponents) ? ` border-green-600` : ` border-white`
    style += isMobile ? ` w-[calc(100%-5px)]` : ` w-9/10`

    return style;
} 

export const listItemNameStyle = `w-25 lg:w-50  break-words`;
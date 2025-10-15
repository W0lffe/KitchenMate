export const listContainerStyle = `w-full h-8/10 lg:h-9/10 border border-white/40 flex flex-col 
                            justify-start items-center rounded-[12px]`;

export const listHeadingStyle = `h-10 w-9/10 flex justify-between items-center lg:p-5 m-2 font-medium text-[15px]`;

export const itemListStyle = `w-full h-max-8/10 p-1 flex flex-col justify-start items-center overflow-y-auto`;

export const nameHeadingStyle = `w-26 lg:w-46`;

export const getListItemStyle = (isMobile, obtained) => {

    let style = `h-fit flex justify-between items-center border bg-gray-400/40  
                                mb-3 p-3 lg:p-5 font-medium rounded-custom hover:bg-gray-600/40`;
    style += obtained ? ` border-green-600` : ` border-white`
    style += isMobile ? ` w-10/10` : ` w-9/10`

    return style;
} 

export const listItemNameStyle = `w-30 lg:w-50  break-words`;
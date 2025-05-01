
export const getContainerStyle = (isMobile) => {
    let style = `w-full h-9/10 border border-white/40 flex flex-col rounded-[12px]`
    style += isMobile ? ` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950/70 overflow-y-auto` : "";

    return style;
}

export const formTopDiv = `flex flex-col lg:flex-row `;

export const imgSection = `w-full lg:w-1/2 h-fit flex items-center justify-center`;

export const imgStyle = `size-40 lg:size-60 p-2`;

export const recipeInfoStyle = `h-fit flex flex-col justify-center items-start text-white`;

export const lineStyle = `flex gap-5 m-2`;

export const labelStyle = `text-[16px] font-semibold`;

export const inputStyle = `border rounded-custom p-1 w-60 
                            transition[background] duration-300 ease-out bg-gray-100/50 hover:bg-white/90 
                            focus:bg-white/90 focus:text-black focus:border-black`;


export const bottomTopDiv = ``;

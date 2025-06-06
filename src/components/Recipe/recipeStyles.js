
export const mobileHeadingStyle = `w-full text-center text-md font-medium m-2`;

export const recipeInfoStyle = `h-fit w-full flex flex-col justify-center items-start lg:p-2`;


export const getInputStyle = (half) => {
    let style =  `border rounded-custom p-1 text-center
                    transition[background] duration-300 ease-out bg-gray-400/60 hover:bg-white/60
                    focus:bg-white/90 focus:text-black focus:border-black`
    style += half ? ` w-25 lg:w-30` : ` w-50`
    return style;
}

export const sectionContainerStyle = `flex flex-col h-full lg:flex-row gap-3`;

export const footerStyle = `flex items-center justify-center m-2`;

export const labelStyle = `text-[16px] font-semibold`;

export const lineStyle = `flex gap-6 m-2 items-center flex-row`;

export const mobileHeadingStyle = `text-[20px] italic text-center w-full font-md`;

export const recipeInfoStyle = `flex flex-col w-full h-fit gap-5  justify-start p-2`;


export const getInputStyle = (half) => {
    let style =  `border rounded-custom-med p-1 text-center
                    transition[background] duration-300 ease-out bg-gray-400/60 hover:bg-white/60
                    focus:bg-white/90 focus:text-black focus:border-black`
    style += half ? ` w-25 lg:w-30` : ` w-fit`
    return style;
}

export const sectionContainerStyle = `flex gap-2 h-fit p-1 `;

export const footerStyle = `flex flex-row w-full items-center justify-center p-2`;

export const labelStyle = `italic text-[16px]`;

export const lineStyle = `flex flex-row gap-5`;

export const tabButtonStyle = ``

export const mobileHeaderStyle = `flex flex-row justify-end items-center p-2`;
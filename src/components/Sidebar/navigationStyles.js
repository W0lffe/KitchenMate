
export const getWrapperStyle = (state) => {
    let wrapperStyle = `fixed top-0 left-0 
                        z-1 border-2 border-custom-whiteborder shadow-md shadow-black/80
                        bg-custom-bgblue
                        flex flex-col justify-start items-center
                        rounded-r-custom-med transition-all transition-discrete duration-1000 
                        ease-in-out overflow-hidden`;

    wrapperStyle += state ? " h-full w-3/4 lg:w-1/8" : " w-[40px] h-[60px] lg:h-full lg:w-[50px]";

    return wrapperStyle;
}

export const topSection = `flex flex-col w-full h-15 items-end p-3`;

export const getIconStyle = (isOpen) => {

    let style = `text-gray-400 animate-pulse transition-all duration-200 ease-in-out`;
    style += isOpen ?  " rotate-180" : " rotate-0";

    return style;
}

export const getSectionStyle = (isOpen) => {

    let style = `flex flex-col w-full h-fit p-2 md:p-5 justify-start items-center transition-all ease-in-out`;
    style += isOpen ?  " opacity-100 duration-600 delay-500" : " opacity-0 duration-300";
    return style;
}


export const headingStyle = `italic font-medium underline p-5`;

export const signupStyle = `text-[14px] italic underline`;


export const getWrapperStyle = (state) => {
    let wrapperStyle = `fixed top-0 left-0 
                        z-1 border-2 border-white/30 shadow-lg shadow-black
                        bg-gray-950/85
                        flex flex-col justify-start items-center
                        rounded-r-[20px] transition[width] duration-1500 ease-out overflow-hidden 
                        text-[18px]`;

    wrapperStyle += state ? " h-full w-3/4 lg:w-1/8" : " w-[40px] h-[60px] lg:h-full lg:w-[50px]";

    return(wrapperStyle);
}

export const topStyle = `flex flex-col w-full h-25 justify-start items-end 
                            px-2 py-3 hover:italic hover:animate-pulse`;

export const getSectionStyle = (state) => {
    let style  = `flex flex-col w-full h-fitp-2 lg:p-5 justify-start items-center
                    transition-opacity ease-out`;
    style += state ? " opacity-100 duration-3000" : " opacity-0 duration-300";

    return(style)
}

export const headingStyle = `italic font-medium underline p-5`;

export const signupStyle = `text-[14px] italic underline`;

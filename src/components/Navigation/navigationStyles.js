
export const getWrapperStyle = (state) => {
    let wrapperStyle = `fixed h-full top-0 left-0 
                        z-1 border-2 border-white/30 bg-gray-400/30 
                        flex flex-col justify-start items-center
                        rounded-r-[20px] transition[width] duration-1000 ease-out`

    wrapperStyle += state ? " w-3/4 lg:w-1/8" : " w-[25px] lg:w-[50px]"

    return(wrapperStyle);
}

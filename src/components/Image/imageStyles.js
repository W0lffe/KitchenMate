
export const imageSection = "flex flex-row w-full max-h-70 gap-2 items-center justify-center";

export const inputStyle =  `text-6xl border rounded-custom p-1 text-center border-white border-2 border-dashed
                    transition[background] duration-300 ease-out bg-gray-400/20 hover:bg-white/60
                    focus:bg-white/90 focus:text-black focus:border-black w-20`;

export const imageStyle = `w-full h-full object-cover object-center aspect-auto border-white/30 border-2 rounded-[26px]`;

export const getImageDivStyle = (inspecting) => {
    let style = `flex flex-row overflow-hidden justify-center`

    style += inspecting ? " w-1/1 max-h-46" : " w-3/4 max-h-52";

    return style;

}
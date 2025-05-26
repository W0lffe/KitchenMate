export const getContainerStyle = (isMobile) => {
    let style = `w-full border border-white/40 flex flex-col rounded-[12px] overflow-y-auto`
    style += isMobile ? ` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950/70 max-h-[90%]` : " h-9/10";

    return style;
}
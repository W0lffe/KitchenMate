export const getContainerStyle = (isMobile) => {
    let style = `border border-custom-whiteborder flex flex-col rounded-custom-low overflow-y-auto `;
    style += isMobile ? ` fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950/70 max-h-[calc(100%-20px)] w-[calc(100%-10px)]` : "w-full h-full";

    return style;
}
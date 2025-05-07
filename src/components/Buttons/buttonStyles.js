
export const naviButtonStyle = `border border-white p-2 lg:p-6 w-9/10 m-2 lg:m-4 
                            whitespace-nowrap rounded-custom bg-gray-500/70 shadow-md 
                            shadow-black hover:bg-gray-600/70 hover:p-7 hover:animate-pulse
                            flex gap-5 items-center justify-center`;

export const getSubmitButtonStyle = (use) =>{
    if(use === "close"){
        return ` text-2xl w-5 hover:bg-red-600/95 hover:animate-pulse` 
    }

    let style = `border w-60 h-10 rounded-custom shadow-xs p-1
                shadow-black hover:animate-pulse flex items-center justify-center`

    switch(use){
        case "login":
            style += ` border-gray-900  hover:bg-gray-600/60 mt-8`
            return style;
        case "recipe":
            style += ` bg-gray-500/70 hover:bg-gray-600/60`
            return style;
    }
}
    
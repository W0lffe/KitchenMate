
export const productStyle = `w-full flex flex-row justify-between text-white px-3 mt-3`;

export const getInputStyle = (input) =>{
    let style = `border border-white h-8 rounded-custom 
                transition[background] duration-300 ease-out bg-gray-400/60 hover:bg-white/60
                focus:bg-white/90 focus:text-black focus:border-black text-center`

    switch(input){
        case "product":
            style += ` w-2/5 p-2`;
            return style;
        case "quantity":
            style += ` w-1/4 p-2`;
            return style;
        case "unit":
            style += ` w-1/4`;
            return style;
    }
} 

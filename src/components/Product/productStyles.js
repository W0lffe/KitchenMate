
export const productStyle = `flex flex-row w-full justify-between px-1`;

export const getInputStyle = (input) =>{
    let style = `border p-1 border-white rounded-custom-low 
                transition-all duration-300 ease-out bg-gray-400/60 hover:bg-white/60
                focus:bg-white/90 focus:text-black focus:border-black text-center`

    switch(input){
        case "product":
            style += ` w-2/5`;
            return style;
        case "quantity":
            style += ` w-1/4`;
            return style;
        case "unit":
            style += ` w-1/4`;
            return style;
    }
} 

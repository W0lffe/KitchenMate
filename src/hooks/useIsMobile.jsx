import { useState } from "react";
export function useIsMobile(){
    
    const breakpoint = 780;
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    return isMobile;
}
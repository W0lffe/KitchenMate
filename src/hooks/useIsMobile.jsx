import { useState } from "react";

/**
 * Custom hook to determine if used device is mobile based on window width
 * @returns {boolean} true if mobile, false otherwise
 */
export function useIsMobile(){
    
    const breakpoint = 780;
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    return isMobile;
}
import { useNavigate } from "react-router-dom"
import Info from "../components/Info/Info";
import { setupInfo } from "../components/Info/helper";
import { useIsMobile } from "../hooks/useIsMobile";
import { useContext, useEffect, useRef } from "react";
import { KitchenContext } from "../context/KitchenContext";
import { labelStyle } from "../components/Info/infoStyles";


export default function Home(){

    const navigate = useNavigate();
    const {setIsMobile, isMobile} = useContext(KitchenContext);
    const useMobile = useIsMobile();
    const containerRef = useRef();

    useEffect(() => {
        setIsMobile(useMobile)
    }, []);

    return(
        <div className="w-full h-full overflow-y-hidden flex flex-col bg-gray-800/70 items-center">
            <div ref={containerRef} className={`w-full h-auto flex flex-col overflow-y-auto scroll-smooth items-center gap-40 md:gap-100 first:pt-50 last:pb-50 snap-y ${!isMobile ? "snap-mandatory snap-y " : " "}`}>
                    {setupInfo().map((item, i) => 
                        <Info key={i} 
                            item={item}
                            reverse={i %2 !== 0}
                            isMobile={isMobile}
                            isFirst={i === 0 && true}
                            isLast={i === 5 && true}
                            navigate={navigate}
                            ref={containerRef}
                        />
                    )}
            </div>
        </div>
    )
}
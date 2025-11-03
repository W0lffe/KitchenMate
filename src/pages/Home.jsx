import { useNavigate } from "react-router-dom"
import Info from "../components/Info/Info";
import { setupInfo } from "../components/Info/helper";
import { useIsMobile } from "../hooks/useIsMobile";
import { useContext, useEffect, useRef } from "react";
import { KitchenContext } from "../context/KitchenContext";


export default function Home(){

    const navigate = useNavigate();
    const {setIsMobile, isMobile} = useContext(KitchenContext);
    const useMobile = useIsMobile();
    const containerRef = useRef();

    useEffect(() => {
        setIsMobile(useMobile)
    }, []);


    return(
        <div className="w-full h-full overflow-y-hidden flex flex-col bg-gray-950/95 items-center">
            <div ref={containerRef} className="w-full h-auto flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth items-center gap-150 first:pt-50 last:pb-50">
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
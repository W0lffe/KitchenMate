import { useNavigate } from "react-router-dom"
import Info from "../components/Info/Info";
import { setupInfo } from "../components/Info/helper";
import { useIsMobile } from "../hooks/useIsMobile";
import { useContext, useEffect, useRef, useState } from "react";
import { KitchenContext } from "../context/KitchenContext";
import { labelStyle } from "../components/Info/infoStyles";
import Header from "../components/Header/Header";

export default function Home() {

    const navigate = useNavigate();
    const { setIsMobile, isMobile } = useContext(KitchenContext);
    const useMobile = useIsMobile();
    const containerRef = useRef();
    const [setup, setSetup] = useState(setupInfo());

    useEffect(() => {
        setIsMobile(useMobile)
    }, []);

    return (
        !isMobile ? (
            <div ref={containerRef} className={`w-full h-full flex flex-col overflow-y-auto scroll-smooth items-center gap-300 pt-50 pb-50 snap-mandatory snap-y bg-gray-800/70`}>
                <Header>
                    <label className={labelStyle + " animate-pulse"}>SCROLL DOWN FOR MORE</label>
                </Header>
                {setup.map((item, i) =>
                    <Info key={i}
                        item={item}
                        reverse={i % 2 !== 0}
                        isMobile={isMobile}
                        isFirst={i === 0 && true}
                        isLast={i === 5 && true}
                        navigate={navigate}
                        ref={containerRef}
                    />
                )}
            </div>
        ) : (
            <div className="w-full h-full overflow-y-hidden flex flex-col bg-gray-800/70 items-center gap-1">
                <Header>
                    <></>
                </Header>
                <div ref={containerRef} className="w-full h-full overflow-y-hidden overflow-x-auto flex flex-row gap-50 snap-mandatory snap-x px-5 items-center-safe">
                    {setup.map((item, i) =>
                    <Info key={i}
                        item={item}
                        reverse={i % 2 !== 0}
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
    )
}
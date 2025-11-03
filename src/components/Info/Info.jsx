import { buttonStyle, 
        imageDiv, 
        infoDiv, 
        labelStyle, 
        sectionStyle } from "./infoStyles";

export default function Info({ item, reverse, isMobile, isFirst, isLast, ref, navigate }) {

    return (
        <div className="flex flex-col w-full items-center ">
            <div className={infoDiv + `${reverse ? " md:flex-row-reverse" : ""} ${!isMobile ? " snap-center" : " "}`}>
                <section className={sectionStyle + " gap-5"}>
                    {item.header &&
                        <span className="w-fit md:w-1/2 text-xl md:text-4xl font-bold italic">
                            <h1>{item.header}</h1>
                        </span>
                    }
                    <p className="italic max-w-52 md:max-w-80">{item.brief}</p>
                    {isFirst &&
                        <button onClick={() => navigate("/app")} className={buttonStyle}>CLICK TO GET STARTED</button>
                    }
                </section>
                <section className={sectionStyle}>
                    <div className={imageDiv}>
                        {isMobile ? (
                            !isFirst && 
                                 <img
                                src={item.mobile}
                                alt="yes"
                                className="object-contain max-h-90 w-auto"
                            />
                        ) : (
                            <img
                                src={reverse ? item.desktopImage : item.mobile}
                                alt="yes"
                                className="object-contain max-h-120 xl:max-h-140 w-auto "
                            />
                        )}
                    </div>
                </section>
            </div>
            {isFirst &&
                    <label className={labelStyle + " animate-bounce"}>SCROLL DOWN FOR MORE</label>
            }
            {(isLast) &&
                <label onClick={() => ref.current.scrollTo({ top: 0, behavior: 'smooth' })}  className={labelStyle}>BACK TO TOP</label>
            }
        </div>
    )
}
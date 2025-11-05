import {
    buttonStyle,
    imageDiv,
    infoDiv,
    labelStyle,
    sectionStyle
} from "./infoStyles";

export default function Info({ item, reverse, isMobile, isFirst, isLast, ref, navigate }) {

    const backToStart = () => {

        const container = ref.current;
        const target = document.getElementById("first");

        console.log(container, target, isMobile)

        if (container && target) {
            if (isMobile) {
                container.scrollTo({
                    left: target.offsetLeft,
                    behavior: 'smooth'
                });
            } else {
                container.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }


    return (
        <div className="flex flex-col w-full items-center h-fit" id={isFirst && "first"}>
            <div className={infoDiv + `${reverse ? " md:flex-row-reverse" : ""}`}>
                <section className={sectionStyle + " gap-5"}>
                    {item.header &&
                        <span className="w-fit md:w-1/2 text-xl md:text-4xl font-bold italic">
                            <h1>{item.header}</h1>
                        </span>
                    }
                    <p className="italic w-full md:max-w-80">{item.brief}</p>
                    {(isFirst) &&
                        <button onClick={() => navigate("/app")} className={buttonStyle}>CLICK TO GET STARTED</button>
                    }
                </section>
                <section className={sectionStyle}>
                    {(!isMobile || (isMobile && !isFirst)) && (
                        <div className={imageDiv}>
                            {isMobile ? (
                                <img
                                    src={item.mobile}
                                    alt="yes"
                                    className="object-contain max-h-80 w-auto"
                                />
                            ) : (
                                <img
                                    src={reverse ? item.desktopImage : item.mobile}
                                    alt="yes"
                                    className="object-contain max-h-120 xl:max-h-140 w-auto"
                                />
                            )}
                        </div>
                    )}
                </section>
            </div>
            {(isFirst && isMobile) &&
                <label className={labelStyle + " animate-pulse"}>SWIPE RIGHT FOR MORE</label>
            }
            {(isLast) &&
                <label onClick={backToStart} className={labelStyle + " animate-pulse"}>BACK TO START</label>
            }
        </div>
    )
}
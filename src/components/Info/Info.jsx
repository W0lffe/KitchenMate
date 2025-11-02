
export default function Info({brief, image, reverse}) {


    return(
        <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} w-full border-1 h-fit`}>
            <section className="w-full md:w-1/2">
                <p>{brief}</p>
            </section>
            <section className="w-full md:w-1/2">
                <img src={image} alt="KitchenMate Application Overview" className="w-10" />
            </section>
        </div>
    )
}
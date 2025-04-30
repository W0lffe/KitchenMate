import List from "../List/List"
export default function RecipeWrapper({ isMobile }) {


    if(isMobile){
        return(
            <>
            <header className="h-1/10">
                    <p>TOOLBAR FOR FILTERING AND SORTING</p>
            </header>
            <List />
            </>
        )
    }

    return (
        <div className="flex flex-row w-full h-full gap-5">
            <section className="w-full h-full">
                <header className="h-1/10 w-full">
                    <p>TOOLBAR FOR FILTERING AND SORTING</p>
                </header>
                <List />
            </section>
            <section className="w-full h-full border border-red-300">
                <header className="h-1/10 w-full">
                    <p>RENDER: RECIPE CREATION / DETAIL BASED ON ACTIVE</p>
                </header>
                <p>RECIPE DETAIL/CREATION COMPONENT</p>
            </section>
        </div>
    )
}
import List from "../List/List"
export default function RecipeWrapper({ isMobile }) {


    if(isMobile){
        return(
            <>
            <header className="h-1/10">
                    <p>TOOLBAR</p>
            </header>
            <List />
            </>
        )
    }

    return (
        <div className="flex flex-row w-full h-full">
            <section className="w-full h-full">
                <header className="h-1/10">
                    <p>TOOLBAR</p>
                </header>
                <List />
            </section>
            <section className="w-full h-full">
                <p>RECIPE DETAIL/CREATION COMPONENT</p>
            </section>
        </div>
    )
}
import { useNavigate } from "react-router-dom"
import Header from "../components/Header/Header";
import Info from "../components/Info/Info";
import { images } from "../components/Info/helper";

export default function Home(){

    const navigate = useNavigate();

    return(
        <div className="w-full h-full flex flex-col overflow-y-auto">
            <Header />
            {images.map((image, i) => 
                <Info key={i} 
                    brief="Lorem ipsum dolor sit amet" 
                    image={image}
                    reverse={i %2 !== 0}
                />
            )}
            <button onClick={() => navigate("/app")} className="border-1 p-5 rounded-custom bg-gray-950/70">CLICK HERE TO ENTER APP</button>
        </div>
    )
}
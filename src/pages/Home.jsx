import { useNavigate } from "react-router-dom"
import Header from "../components/Header/Header";

export default function Home(){

    const navigate = useNavigate();

    //<button onClick={() => navigate("/app")} className="border-1 p-5 rounded-custom bg-gray-950/70 animate-pulsing">CLICK HERE TO ENTER APP</button>

    return(
        <div className="w-full h-full flex flex-col overflow-y-auto">
            <Header />
        </div>
    )
}
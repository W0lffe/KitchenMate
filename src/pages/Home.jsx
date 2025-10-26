import { useNavigate } from "react-router-dom"

export default function Home(){

    const navigate = useNavigate();

    return(
        <div className="w-full h-full flex flex-col items-center justify-center text-6xl">
            <h1>THIS HOMEPAGE IS A WORK IN PROGRESS</h1>
            <button onClick={() => navigate("/app")} className="border-1 p-5 rounded-custom bg-gray-950/70 animate-pulsing">CLICK HERE TO ENTER APP</button>
        </div>
    )
}
import Header from '../components/Header/Header'
import Modal from '../components/Modal/Modal'
import MainContainer from '../components/MainContainer/MainContainer'
import Navigation from '../components/Sidebar/Navigation'
import { Toaster } from 'react-hot-toast'

export default function Application(){

    return(
        <div className="flex flex-col items-center w-full h-full">
            <Toaster />
            <Modal />
            <Navigation />
            <Header />  
            <MainContainer />
        </div>
    )
}
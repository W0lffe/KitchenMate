import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import MainContainer from './components/MainContainer/MainContainer'
import NavigationWrapper from './components/Sidebar/NavigationWrapper'
import KitchenContextProvider from './context/KitchenContext'
import { Toaster } from 'react-hot-toast'
import { REFACTOR } from '../backend/api'

export default function App() {
  REFACTOR();
  return (
    <KitchenContextProvider>
      <div className="flex justify-center items-start w-full h-full">
        <Toaster />
        <Modal />
        <NavigationWrapper />
        <Header />  
        <MainContainer />
      </div>
      </KitchenContextProvider>
  )
}


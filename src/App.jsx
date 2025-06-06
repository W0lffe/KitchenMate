import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import MainContainer from './components/MainContainer/MainContainer'
import NavigationWrapper from './components/Sidebar/NavigationWrapper'
import KitchenContextProvider from './context/KitchenContext'


export default function App() {

  return (
    <KitchenContextProvider>
      <div className="flex justify-center items-start w-full h-full">
        <Modal />
        <NavigationWrapper />
        <Header />  
        <MainContainer />
      </div>
      </KitchenContextProvider>
  )
}


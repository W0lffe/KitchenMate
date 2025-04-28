import {  } from 'react'
import Header from './components/Header/Header'
import KitchenContextProvider from './context/KitchenContext'


export default function App() {

  return (
    <KitchenContextProvider>
      <div className="flex justify-center items-start w-full h-full">
        <Header />
      </div>
      </KitchenContextProvider>
  )
}


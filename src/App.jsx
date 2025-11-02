import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Application from "./pages/Application"
import KitchenContextProvider from './context/KitchenContext'

export default function App() {

  return (
    <KitchenContextProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Application />} />
      </Routes>
    </KitchenContextProvider>
  )
}


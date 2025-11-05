import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Application from "./pages/Application"
import KitchenContextProvider from './context/KitchenContext'

export default function App() {

  return (
    <KitchenContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Application />} />
      </Routes>
    </KitchenContextProvider>
  )
}


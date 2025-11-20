import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Application from "./pages/Application"
import Register from "./pages/Register"
import KitchenContextProvider from './context/KitchenContext'


/**
 * Main renderable component of the application
 * @returns Routes wrapped to context provider
 */
export default function App() {

  return (
    <KitchenContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Application />} />
        <Route path="/signup" element={<Register />}/>
      </Routes>
    </KitchenContextProvider>
  )
}


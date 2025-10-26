import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Application from "./pages/Application"

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Application />} />
    </Routes>
  )
}


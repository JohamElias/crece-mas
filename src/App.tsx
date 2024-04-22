
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FormularioCitasMedicas from './Pages/Form/Form'
import ListaCitas from './Pages/ListaCitas/ListaCitas'
function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<ListaCitas />}/> {/* 👈 Renders at /app/ */}
        <Route path="/nuevaCita" element={<FormularioCitasMedicas />}/> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

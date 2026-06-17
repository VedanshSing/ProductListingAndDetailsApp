import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProductListing from './Pages/ProductListing'
import ProductDetails from './Pages/ProductDetails'
import Navbar from './Components/Navbar/Navbar'
import FilterPage from './Pages/FilterPage'

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/filter" element={<FilterPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App

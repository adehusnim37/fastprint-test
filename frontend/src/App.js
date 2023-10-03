import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

export default function App() {
    return (
        <div className='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ProductList/>}/>
                    <Route path='/create' element={<AddProduct/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
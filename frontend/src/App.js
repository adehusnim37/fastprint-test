import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

export default function App() {
    return (
        <div className='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<ProductList/>}/>
                    <Route path='/create' element={<AddProduct/>}/>
                    <Route path='/edit/:id' element={<EditProduct/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
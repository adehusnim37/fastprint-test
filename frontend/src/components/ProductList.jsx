import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import useSWR from "swr";


const ProductList = () => {
    const fetcher = async () => {
        const res = await axios.get('http://localhost:4000/api/v1/product');
        return res.data;
    };

    const { data } = useSWR('products', fetcher);

    const [filteredProducts, setFilteredProducts] = useState([]); // state untuk menyimpan product yang bisa dijual

    useEffect(() => {
        if (data) {
            const filteredProducts = data.data.filter(product => product.status.nama_status === 'bisa dijual'); // filter product yang bisa dijual
            setFilteredProducts(filteredProducts); // set filtered products ke state
        }
    }, [data]);

    if (!data) {
        return <h2>Loading...</h2>;
    }

    const deleteProduct = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/product/${id}`);
                // Refresh the page
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='flex flex-col mt-5'>
            <div className='w-full'>
                <Link to={'/create'}
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Add
                    Product</Link>
                <div className='relative shadow rounded-lg mt-3'>
                    <table className='w-full text-sm text-left text-grey-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='px-1 py-3 text-center'>ID</th>
                            <th className='px-6 py-3'>Nama Produk</th>
                            <th className='px-6 py-3'>Harga</th>
                            <th className={'px-1 py-3 text-center'}>Kategori</th>
                            <th className={'px-1 py-3 text-center'}>Status</th>
                            <th className='px-1 py-3 text-center'>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className='bg-white border-b'>
                                <td className='px-1 py-3 text-center'>{product.id}</td>
                                <td className='px-6 py-3 font-medium text-gray-900'>{product.nama_produk}</td>
                                <td className='px-6 py-3'>{product.harga}</td>
                                <td className='px-1 py-3 text-center'>{product.kategori.nama_kategori}</td>
                                <td className='px-1 py-3 text-center'>{product.status.nama_status}</td>
                                <td className='px-1 py-3 text-center'>
                                    <Link to={`/product/edit/${product.id}`}
                                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1'>Edit</Link>
                                    <button onClick={() => deleteProduct(product.id)}
                                          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;

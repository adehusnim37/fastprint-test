import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
    const [namaProduk, setNamaProduk] = useState('');
    const [hargaProduk, setHargaProduk] = useState('');
    const [kategoriProduk, setKategoriProduk] = useState('');
    const [statusProduk, setStatusProduk] = useState('');
    const navigate = useNavigate();

    console.log('Payload:', {
        nama_produk: namaProduk,
        harga: hargaProduk,
        kategori_id: kategoriProduk,
        status_id: statusProduk,
        created_at: new Date(),
        updated_at: new Date(),
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/v1/product', {
            nama_produk: namaProduk,
            harga: hargaProduk,
            kategori_id: kategoriProduk,
            status_id: statusProduk,
        }).then(function (response) {
            navigate('/');
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

            return (
                <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
                    <form onSubmit={handleSubmit} className='my-10'>
                        <div className='flex flex-col'>
                            <div className='mb-5'>
                                <label className='font-bold text-slate-700'>Nama Produk</label>
                                <input type='text'
                                       className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slat-500 hover:shadow'
                                       placeholder='Nama Produk'
                                       value={namaProduk}
                                       onChange={(e) => setNamaProduk(e.target.value)}/>
                            </div>
                            <div className='mb-5'>
                                <label className='font-bold text-slate-700'>Harga Produk</label>
                                <input type='number'
                                       className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slat-500 hover:shadow'
                                       placeholder='Harga Produk'
                                       value={hargaProduk}
                                       onChange={(e) => setHargaProduk(e.target.value)}/>
                            </div>
                            <div className='mb-5'>
                                <label className='font-bold text-slate-700'>Kategori Produk</label>
                                <input type='number'
                                       className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slat-500 hover:shadow'
                                       placeholder='Kategori Produk'
                                       value={kategoriProduk}
                                       onChange={(e) => setKategoriProduk(e.target.value)}/>
                            </div>
                            <div className='mb-5'>
                                <label className='font-bold text-slate-700'>Status Produk</label>
                                <input type='number'
                                       className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slat-500 hover:shadow'
                                       placeholder='Status Produk'
                                       value={statusProduk}
                                       onChange={(e) => setStatusProduk(e.target.value)}/>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        export default AddProduct;
import {PrismaClient} from '@prisma/client'
import Validator from 'fastest-validator';


const v = new Validator();

const prisma = new PrismaClient();

const schema = {
    nama_produk: {type: "string", optional: false, empty: false},
    harga: {type: "number", empty: false, optional: false, min: "1000"},
    kategori_id: {type: "number", empty: false, optional: false, max: "100"},
    status_id: {type: "number", empty: false, optional: false, max: "100"},
}
export const getProduct = async (req, res) => {
    try {
        const product = await prisma.product.findMany({
            include: {
                kategori: true,
                status: true
            }
        });
        if (!product) {
            console.log("Error besar")
        }
        // count data product
        const count = await prisma.product.count();
        res.status(200).json({
            status: "success", count: count, data: product, message: "berhasil mengambil product"
        })
    } catch (err) {
        res.status(404).json({
            status: "failed", message: err.message,
        });
    }
}

export const ProductById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const product = await prisma.product.findUnique({where: {id}})
        if (!product) {
            console.log("Error besar")
        }
        res.status(200).json({
            status: "success", data: product, message: "berhasil mengambil product"
        })
    } catch (err) {
        res.status(404).json({
            status: "failed", message: err.message,
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: (validate),
            });
        }

        const {nama_produk, harga, kategori_id, status_id} = req.body;

        const product = await prisma.product.create({
            data: {nama_produk : nama_produk, harga: harga, kategori_id : kategori_id, status_id: status_id},
        });

        if(!product){
            res.status(400).json({
                status: 'error',
                data: product,
                message: 'Gagal menambahkan product'
            })
        }

        res.status(201).json({
            status: 'success',
            data: product,
            message: 'Berhasil menambahkan product',
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json({
                status: 'error',
                message: validate,
            });
        }

        const id = Number(req.params.id);
        const {nama_produk, harga, kategori_id, status_id} = req.body;
        const updateProduct = await prisma.product.update({
            where: {id},
            data: {nama_produk, harga, kategori_id, status_id, updatedAt: new Date()},
        });

        if (!updateProduct) {
            return res.status(400).json({
                status: 'error',
                message: 'Gagal update product',
            });
        }

        res.status(200).json({
            status: 'success',
            data: updateProduct,
            message: 'Berhasil update product',
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deleteProduct = await prisma.product.delete({where: {id}});
        if (!deleteProduct) {
            return res.status(400).json({
                status: 'error',
                message: 'Gagal delete product',
            });
        }
        res.status(200).json({
            status: 'success',
            data: deleteProduct,
            message: 'Berhasil delete product',
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
}


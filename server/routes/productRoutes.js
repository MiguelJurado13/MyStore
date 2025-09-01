import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

//GET /api/products Esta Lista todos los productos que existan
router.get('/', async (req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: 'Error al Obtener los Productos'})
    }
})

//GET /api/products/:id Aqui obtenemos Producto por ID
router.get('/:id', async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({ error: 'Producto No encontrado'})
        }

        res.json(product)
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar el producto' })
    }
})






//Exportamos el Router Completo
export default router
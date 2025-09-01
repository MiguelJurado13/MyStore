import express, { Router } from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'

const router = express.Router()


//POST /api/Routers/  Crea Una Nueva Orden
router.post('/', async (req,res) => {
    try{
        const {userId, products, total, status } = req.body

        const newOrder = new Order({
            userId,
            products,
            total,
            status: status || 'Pendiente',
        })

        const saveOrder = await newOrder.save()
        res.status(201).json(saveOrder)
    }catch (err) {
        res.status(500).json( { error: 'Error al crear la Orden'} )
    }
})

//GET /api/orders Lista las Ordenes disponibles
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId')
        res.json(orders) 
    }catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Error al obtener las ordenes' })
    }
})

export default router
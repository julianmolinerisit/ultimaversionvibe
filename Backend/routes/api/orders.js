import express from 'express';
import { getOrderById, getAllOrders, updateOrderStatus, deleteOrder, createOrder } from '../../controllers/orderController.js';

const router = express.Router();

// Rutas para pedidos
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.post('/', createOrder); // Ruta para crear una orden
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrderStatus);

export default router;

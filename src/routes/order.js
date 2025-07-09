const express = require('express');
const auth = require('../middleware/auth');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Crea una nueva orden para el usuario autenticado
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Orden creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Petición inválida (e.g. sin items)
 *       401:
 *         description: No autorizado / token inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno al crear la orden
 */
router.post('/', auth, createOrder);

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Obtiene todas las órdenes del usuario autenticado
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: No autorizado / token inválido
 *       500:
 *         description: Error interno al listar órdenes
 */
router.get('/', auth, getOrders);

module.exports = router;

const express = require('express');
const router  = express.Router();

const {
  getAllProducts,
  getProductById
} = require('../controllers/productController');

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lista todos los productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Array de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/', getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalle del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', getProductById);

module.exports = router;

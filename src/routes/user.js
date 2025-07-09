const express = require('express');
const auth = require('../middleware/auth');
const { getMe } = require('../controllers/userController');
const router = express.Router();

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Obtiene los datos del usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado / token inválido
 */
router.get('/', auth, getMe);

module.exports = router;

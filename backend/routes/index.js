const express = require('express');
const productRoutes = require('./product.routes');
const authRoutes = require('./auth.routes');
const authenticateJWT = require('../middleware/authmiddleware');
const router = express.Router();

router.use('/products',authenticateJWT, productRoutes);
router.use('/auth', authRoutes);
router.use('/uploads', express.static('uploads'));

module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../controllers/product.controller');

router.get('/', productController.getAllProducts);
router.post('/',upload.single('image'), productController.upsertProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

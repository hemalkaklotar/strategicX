const Product = require('../models/product.model');
const { Op } = require('sequelize');


exports.getAllProducts = async (req, res) => {
  try {
    const {
      search = '',
      sortBy = 'id',
      sortOrder = 'asc',
      page = 1,
      limit = 10,
      name,
      description,
      category,
      price,
      quantity,
      warranty,
      status,
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {
      createdBy: req.user.id,  
    };

    if (search) {
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push({
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
          { price: { [Op.like]: `%${search}%` } },
          { quantity: { [Op.like]: `%${search}%` } },
          { warranty: { [Op.like]: `%${search}%` } },
        ],
      });
    }

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (description) where.description = { [Op.like]: `%${description}%` };
    if (Array.isArray(category) && category.length > 0) {
      where[Op.or] = category.map((cat) => ({
        category: { [Op.like]: `%${cat}%` }
      }));
    }
    if (status) where.status = status;
    if (price) where.price = { [Op.like]: `%${price}%` };
    if (quantity) where.quantity = { [Op.like]: `%${quantity}%` };
    if (warranty) where.warranty = { [Op.like]: `%${warranty}%` };

    const { rows: products, count: total } = await Product.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.upsertProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      status,
      quantity,
      warranty
    } = req.body;

    const file = req.file;
    const imageBuffer = file ? file.buffer : null;

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);
    const parsedWarranty = parseInt(warranty) || 0;

    let product;
    let message;

    if (id && id !== 'undefined') {
      product = await Product.findByPk(id);

      if (product) {
        await product.update({
          name,
          description,
          price: parsedPrice,
          category,
          status,
          quantity: parsedQuantity,
          warranty: parsedWarranty,
          image: imageBuffer ?? product.image,
          createdBy: req.user.id,
        });

        message = "Product updated successfully.";
      } else {
        product = await Product.create({
          id,
          name,
          description,
          price: parsedPrice,
          category,
          status,
          quantity: parsedQuantity,
          warranty: parsedWarranty,
          image: imageBuffer,
          createdBy: req.user.id,
        });

        message = "Product created successfully (ID not found, so new one added).";
      }
    } else {
      product = await Product.create({
        name,
        description,
        price: parsedPrice,
        category,
        status,
        quantity: parsedQuantity,
        warranty: parsedWarranty,
        image: imageBuffer,
        createdBy: req.user.id,
      });

      message = "Product created successfully.";
    }

    res.status(200).json({ message, product });
  } catch (err) {
    console.error("Upsert error:", err);
    res.status(500).json({ error: "Failed to upsert product: " + err.message });
  }
};







exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

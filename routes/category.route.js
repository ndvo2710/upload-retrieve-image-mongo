const express = require('express');
const router = express.Router();

// now use multer
const uploadMulter = require('../middlewares/upload.js');

// Controller
const { createCategory } = require('../controllers/category.controllers.js');

router.post('/category', uploadMulter, createCategory);

module.exports = router 
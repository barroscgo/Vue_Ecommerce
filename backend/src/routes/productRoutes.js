const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/productController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;

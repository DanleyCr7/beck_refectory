const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu-controller');

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:day/:meal', controller.getByDayAndMeal);
router.put('/:day/:meal', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/student-controller');
const authConfig = require('../config/auth');

router.post('/register', controller.register);
router.post('/authenticate', authConfig, controller.auth);

router.get('/', controller.get);
router.get('/required-meal', controller.getByRequiredMeal);
router.get('/can-required-meal', controller.getByCanRequiredMeal);
router.get('/cannot-required-meal', controller.getByCannotRequiredMeal);
router.get('/:matricula', controller.getByMatricula);
router.get('/admin/:id', controller.getById);

router.put('/:id', controller.put);
router.put('/required-meal/:id', controller.putRequiredMeal);
router.put('/can-required-meal/:id', controller.putCanRequiredMeal);

router.delete('/:id', controller.delete);

module.exports = router;
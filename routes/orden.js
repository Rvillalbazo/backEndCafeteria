const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares');
const { createOrden, deleteOrden, getOrden, getOrdenByID, updateOrden } = require('../controllers');

const router = Router();

router.get('/', getOrden);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], getOrdenByID);

router.post('/', createOrden);

router.put('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], updateOrden);

router.delete('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], deleteOrden);

module.exports = router;
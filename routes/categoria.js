const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares');
const { createCategoria, deleteCategoria, getCategoria, getCategoriaByID, updateCategoria } = require('../controllers');

const router = Router();

router.get('/', getCategoria);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], getCategoriaByID);

router.post('/', createCategoria);

router.put('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], updateCategoria);

router.delete('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], deleteCategoria);

module.exports = router;
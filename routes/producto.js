const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares');
const { createProducto, getProducto, getProductoByID,getProductoxCategoriaByID, updateProducto,deleteProducto } = require('../controllers');

const router = Router();

router.get('/', getProducto);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], getProductoByID);

router.get('/categoria/:idCategory', [
    check('idCategory', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], getProductoxCategoriaByID);

router.post('/', [
    check('nombre', 'El nombre del producto es obligatorio.').not().isEmpty(),
    check('category', 'El ID no es válido.').isMongoId(),
    check('category', 'La categoría del producto es obligatoria.').not().isEmpty(),
    fieldsValidator 
],createProducto);

router.put('/:id', [
    check('category', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], updateProducto);

router.delete('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], deleteProducto);

module.exports = router;
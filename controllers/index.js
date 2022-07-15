const Producto = require('./producto');
const Categoria = require('./categoria');
const Orden = require('./orden');

module.exports = {
    ...Orden,
    ...Producto,
    ...Categoria
}
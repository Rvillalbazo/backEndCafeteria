const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    precio: {
        type: Schema.Types.Decimal128,
        required: [true, 'El precio del producto es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen del producto es obligatorio']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

// Quitar valores que no se quieren mostrar
ProductoSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('Producto', ProductoSchema);
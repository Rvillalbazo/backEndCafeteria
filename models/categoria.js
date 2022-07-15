const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    icono: {
        type: String,
        required: [true, 'El precio del producto es obligatorio']
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('Category', CategorySchema);
const { Schema, model } = require('mongoose');

const OrdenSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del contacto es obligatorio'],
        unique: true
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    total:{
        type: Schema.Types.Decimal128
    },
    pedido:{
        type: Schema.Types.Mixed
    }
});

OrdenSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('Orden', OrdenSchema);
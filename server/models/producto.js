const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    codigo: { type: String},
    nombre: { type: String },
    descripcion: { type: String },
    precio: {type: String },
    disponibilidad: { type: Boolean },

});

module.exports = mongoose.model('productos', ProductoSchema);
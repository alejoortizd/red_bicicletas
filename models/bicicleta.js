const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BicicletaShcema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    }
});

BicicletaShcema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this({
        code,
        color,
        modelo,
        ubicacion
    });
};

BicicletaShcema.methods.toString = function() {
    return `code: ${this.code} | color: ${this.color}`
};

BicicletaShcema.statics.allBicis = function(cb) {
    return this.find({}, cb);
}

BicicletaShcema.statics.add = function(aBici, cb) {
    this.create(aBici, cb);
}

BicicletaShcema.statics.findByCode = function(aCode, cb) {
    return this.findOne({code: aCode}, cb);
}

BicicletaShcema.statics.removeByCode = function(aCode, cb) {
    return this.deleteOne({code: aCode}, cb);
}

module.exports = mongoose.model('Bicicleta', BicicletaShcema)


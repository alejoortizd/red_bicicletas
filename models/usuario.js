const mongoose = require('mongoose');
const Reserva = require('./reserva');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    validate: [validarwEmail, 'Por favor, ingrese un correo valido'],
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio']
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.pre('save', function(next) {
  if (this.passwordisModified('password')){
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
})

usuarioSchema.methods.validarwPassword = function(password) {
  
}


usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb) {
  const reserva = new Reserva(
    {
      usuario: this._id,
      bicicleta: biciId,
      desde: desde,
      hasta: hasta
    });
    console.log(reserva);
    reserva.save(cb);
}

module.exports =mongoose.model('Usuario', usuarioSchema);
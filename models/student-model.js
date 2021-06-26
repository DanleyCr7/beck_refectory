const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  }, 
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  matricula: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  classroom: {
    type: String,
    required: true,
  },
  absents: {
    type:Number,
    required: true,
    default: 0,
  },
  requiredMeal: {
    type: Boolean,
    required: true,
    default: false,
  },
  canRequiredMeal: {
    type: Boolean,
    required: true,
    default: false,
  },
  subgroup: {
    type: String,
    enum: [ 'counter-round-school', 'no-counter-round-school', 'technical' ],
  },
}, {
  timestamps: true
});

schema.pre('save', async function hashPwd(next) {
  if(!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

schema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  }, 

  generateToken() {
    try {
      return jwt.sign({ id: this.id }, process.env.SECRET, {
        expiresIn: 300// 86400
      });
    } catch(err) {
      res.status(401).send({
        error: 'deu merda no token',
        data: err
      })
    }
    console.log('token gerado')
  }
};

module.exports = mongoose.model('Student', schema);
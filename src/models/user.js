import mongoose from 'mongoose';
import Util from 'util';
import bcrypt from 'bcrypt';

const hashAsync = Util.promisify(bcrypt.hash);
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true, 
    select: false 
  },
  address: String,
  cep: String,
  uf: String,
  phone: Number,
  cro: Number,
  specialization: String,
  created: Date,
  updated: Date,
  role: String
});

UserSchema.pre('save', async function(next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await hashAsync(this.password, 10);
    this.password = hashedPassword;
  } catch (err) {
    next(err);
  }
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => ({
    _id: ret._id,
    email: ret.email,
    name: ret.name,
    password: ret.password,
    address: ret.address,
    cep: ret.cep,
    uf: ret.uf,
    phone: ret.phone,
    cro: ret.cro,
    specialization: ret.specialization,
    role: ret.role,
    created: ret.created,
    updated: ret.updated
  })
});

const User = mongoose.model('User', UserSchema);

export default User;

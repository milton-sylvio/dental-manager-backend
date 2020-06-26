import mongoose from 'mongoose';
import database from '../database';

const CovenantSchema = new mongoose.Schema({
  _id: Number,
  name: {
    required: true,
    type: String,
    trim: true,
    uppercase: true
  },
  created: Date,
  updated: Date
}, { _id: false });

CovenantSchema.set('toJSON', {
  transform: (doc, ret) => ({
    _id: ret._id,
    name: ret.name,
    created: ret.created,
    updated: ret.updated
  })
});

CovenantSchema.plugin(database.autoIncrement());

const Covenant = mongoose.model('Covenant', CovenantSchema);

export default Covenant;

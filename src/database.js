import mongoose from 'mongoose';
import config from 'config';
import autoIncrementFactory from 'mongoose-sequence';

const env = process.env.NODE_ENV || 'production';
const mongodbUrl = config.get(env + '.database_url');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const connect = () => mongoose.connect(mongodbUrl, options);
const autoIncrement = () => autoIncrementFactory(mongoose.connection);
// const useIndex = () => mongoose.set('useCreateIndex', true);
// mongoose.set('useCreateIndex', true);

export default {
  // useIndex,
  autoIncrement,
  connect,
  connection: mongoose.connection
}
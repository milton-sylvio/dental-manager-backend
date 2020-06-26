import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const env = process.env.NODE_ENV || 'production';

class Auth {
  constructor(User) {
    this.User = User;
  }
  
  async authenticate(data) {
    const user = await this.User.findOne({ email: data.email }).select('+password');

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return false;
    }

    return user;
  }

  static generateToken(payload) {
    return jwt.sign(payload, config.get(env + '.auth.key'), {
      expiresIn: config.get(env + '.auth.tokenExpiresIn')
    });
  }
}

export default Auth;

import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

const { secret_key } = process.env

  const Signin = async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return { status: 401, data: { message: 'Invalid credentials' } };
      }
  
      const isMatch = await user.isValidPassword(password);
  
      if (!isMatch) {
        return { status: 401, data: { message: 'Invalid credentials' } };
      }
  
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        secret_key,
        { expiresIn: '3h' }
      );
  
      return { status: 200, data: { token: token, user: user } };
    } catch (error) {
      throw error;
    }
  };


  export default Signin
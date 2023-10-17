
import User from '.././models/user.js';

import passport from 'passport';
import passportJWT from 'passport-jwt'

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { secret_key } = process.env

// Configure JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_key,
};

// Create JWT strategy
const strategy = new JwtStrategy(jwtOptions, async(payload, done) => {
  // Find the user by ID in the payload
  try {
    const foundUser = await User.findById(payload.id)
    if (foundUser) {
      // If user is found, return user
      done(null, {user:foundUser});
    } else {
      // If user is not found, return false
      done(null, false);
    }
  } catch (error) {
    
  }
});

// Use the JWT strategy
passport.use(strategy);

// Export the authentication middleware
const authenticateJwt = passport.authenticate('jwt', { session: false });

export default authenticateJwt;
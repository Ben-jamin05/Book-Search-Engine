const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: ({ req }) => {
    // allows token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;
  
    // if authorization header is present, extract the token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (!token) {
      console.log('No token provided!');
      return null; // return null to indicate no user
    }
  
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data }; // attach user data to the context
    } catch (error) {
      console.log('Invalid token');
      return null; // return null to indicate invalid token
    }
  },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

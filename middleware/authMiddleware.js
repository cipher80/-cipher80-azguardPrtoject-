const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("middleware token == ", token);
  jwt.verify(token, "token", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    req.user = user.role;
    next();
  });
}

// function isAdmin(req, res, next) {
//   console.log('req.user:', req.user);
//   if (req.user && req.user.role ==="admin") {
//      next();
//   } else {
//     res
//       .status(403)
//       .json({ message: "Access forbidden. Only admin users allowed.",
//               error:error.message 
//       });
//   }
// }

function roleAuthorization(roles) {
    return function(req, res, next) {
    console.log('req.user:', req.user);
    if  (!req.user || !roles.includes(req.user.role)) {
      console.log('User has required role, proceeding...');
      next();
    } else {
      console.error('Access forbidden: User does not have required role.');
      res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }
  };
}

module.exports = {
  authenticateJWT,
  roleAuthorization,
};
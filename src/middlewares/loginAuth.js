const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errors: "Login required" });
  }
  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { _id, email } = data;
    req.userId = _id;
    req.userEmail = email;

    //verifying if user still exists on database
    //there's a big discussion if it we need to check everytime if jwt payload data still exists
    const user = await User.findOne({ _id, email });
    if (!user) {
      return res.status(401).json({ errors: "Invalid or expired token" });
    }

    return next();
  } catch (e) {
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
};

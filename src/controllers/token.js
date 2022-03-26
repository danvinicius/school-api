const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
module.exports = {
  store: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ errors: "Invalid credentials." });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ errors: "User doesn't exist." });
      }
      const passwordHash = user.password;
      if (!bcrypt.compareSync(password, passwordHash)) {
        return res.status(401).json({ errors: "Invalid password." });
      }
      const { _id } = user;
      const token = jwt.sign({ _id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.json({ token });
    } catch (e) {
      return res.status(500).json(null);
    }
  },
};

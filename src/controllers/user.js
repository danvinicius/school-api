const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ res: "Email already registered" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = await User.create({ name, email, password: hash });

      //token
      const { _id } = user;
      const token = jwt.sign({ _id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({
        res: {
          user: {
            name,
            email,
          },
          token,
        },
      });
    } catch (e) {
      return res.status(400).json({ errors: e.message });
    }
  },
  // index: async (req, res) => {
  //   try {
  //     const users = await User.find().select("-password");
  //     return res.json({ res: users });
  //   } catch (e) {
  //     return res.json({ errors: e.message });
  //   }
  // },
  // show: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     if (!mongoose.isValidObjectId(id)) {
  //       return res.status(400).json({ res: "Invalid ID" });
  //     }
  //     const user = await User.findOne({ _id: id }).select("-password");
  //     if (!user) {
  //       return res.status(404).json({ errors: "User doesn't exist." });
  //     }
  //     return res.json({ res: user });
  //   } catch (e) {
  //     return res.json({ errors: e.message });
  //   }
  // },
  update: async (req, res) => {
    try {
      const id = req.userId;
      if (!id) {
        return res.status(401).json({ res: "You must be logged" });
      }
      const { name, email, password } = req.body;
      let hash;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ res: "Invalid ID" });
      }
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ errors: "User doesn't exist." });
      }
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(null || password, salt);
      }
      await User.updateOne(
        { _id: id },
        {
          $set: {
            name,
            email,
            password: hash,
          },
        }
      );
      return res.json({
        res: {
          user: {
            name,
            email,
          },
        },
      });
    } catch (e) {
      return res.json({ errors: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.userId;
      if (!id) {
        return res.status(401).json({ res: "You must be logged" });
      }
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ res: "Invalid ID" });
      }
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ errors: "User doesn't exist." });
      }
      await User.deleteOne({ _id: id });
      return res.status(200).json({ res: "User deleted" });
    } catch (e) {
      return res.status(500).json({ errors: e.message });
    }
  },
};

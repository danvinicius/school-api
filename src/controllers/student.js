const Student = require("../models/Student");
const mongoose = require("mongoose");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, lastname, email, age, school_class, weight, height } =
        req.body;
      const studentExists = await Student.findOne({ email });
      if (studentExists) {
        return res.status(400).json({ res: "Email already registered" });
      }
      await Student.create({
        name,
        lastname,
        email,
        age,
        school_class,
        weight,
        height,
      });
      res.status(200).json({
        res: "student created",
      });
    } catch (e) {
      res.status(400).json({ errors: e.message });
    }
  },
  index: async (req, res) => {
    try {
      const students = await Student.find().sort({ name: 1 });
      return res.json({ res: students });
    } catch (e) {
      return res.json({ errors: e.message });
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ res: "Invalid ID" });
      }
      const student = await Student.findOne({ _id: id });
      if (!student) {
        return res.status(404).json({ errors: "Student doesn't exist." });
      }
      return res.json({ res: student });
    } catch (e) {
      return res.json({ errors: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, lastname, email, age, school_class, weight, height } =
        req.body;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ res: "Invalid ID" });
      }
      const student = await Student.findOne({ _id: id });
      if (!student) {
        return res.status(404).json({ errors: "Student doesn't exist." });
      }
      await Student.updateOne(
        { _id: id },
        {
          $set: {
            name,
            lastname,
            email,
            age,
            school_class,
            weight,
            height,
          },
        }
      );
      return res.json({ res: "Student updated" });
    } catch (e) {
      return res.json({ errors: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ res: "Invalid ID" });
      }
      const student = await Student.findOne({ _id: id });
      if (!student) {
        return res.status(404).json({ errors: "Student doesn't exist." });
      }
      await Student.deleteOne({ _id: id });
      return res.status(200).json({ res: "Student deleted" });
    } catch (e) {
      return res.status(500).json({ errors: e.message });
    }
  },
};

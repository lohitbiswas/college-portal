const studentService = require('../services/studentService');

const createStudent = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newStudent = await studentService.createStudent(email, name, password);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await studentService.loginStudent(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const correctProfile = async (req, res) => {
  const { name } = req.body;
  const studentId = req.user.id;
  try {
    const updatedProfile = await studentService.correctProfile(studentId, name);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createStudent, loginStudent, correctProfile };

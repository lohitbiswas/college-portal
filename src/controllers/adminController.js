const adminService = require('../services/adminService');

const createAdmin = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newAdmin = await adminService.createAdmin(email, name, password);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await adminService.loginAdmin(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await adminService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentbyId = async (req, res) => {
    const { id } = req.params;
    console.log(`Querying for user with id: ${id}`);
    try {
      const students = await adminService.getStudentbyId(id);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getstudentbyemail = async (req, res) => {
    const { email } = req.params;
    console.log(`Querying for user with email: ${email}`);
    try {
      const students = await adminService.getstudentbyemail(email);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateStudent = async (req, res) => {
    const{ id}=req.params;
    const { email } = req.body;
    console.log(`Querying for user with email: ${id}`);
    try {
      const students = await adminService.updateStudent(id,email);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateStudentprofile = async (req, res) => {
    const{ id}=req.params;
    const { profile } = req.body;
    console.log(`Querying for user with profileID: ${id}`);
    try {
      const students = await adminService.updateStudentProfile(id,profile);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports = { createAdmin, loginAdmin, getAllStudents , getStudentbyId, getstudentbyemail, updateStudent, updateStudentprofile};

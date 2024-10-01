const adminModel = require('../models/adminModel');

const createAdmin = async (email, name, password) => {
  return await adminModel.createAdmin(email, name, password);
};

const loginAdmin = async (email, password) => {
  return await adminModel.loginAdmin(email, password);
};

const getAllStudents = async () => {
  return await adminModel.getAllStudents();
};

const getStudentbyId = async (id) => {
  return await adminModel.getStudentbyId(id);
};

const getstudentbyemail = async (email) => {
  return await adminModel.getstudentbyemail(email);
};

const updateStudent = async (id,email) => {
  return await adminModel.updateStudent(id,email);
};

const updateStudentProfile = async (id,profile) => {
  return await adminModel.updateStudentProfile(id,profile);
};

module.exports = { createAdmin, loginAdmin, getAllStudents,getStudentbyId,getstudentbyemail ,updateStudent,updateStudentProfile};

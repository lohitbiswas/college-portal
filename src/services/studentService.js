const studentModel = require('../models/studentModel');

const createStudent = async (email, name, password) => {
  return await studentModel.createStudent(email, name, password);
};
const refreshToken = async (refreshToken) => {
  return await studentModel.refreshToken(refreshToken);
};
const loginStudent = async (email, password) => {
  return await studentModel.loginStudent(email, password);
};

const correctProfile = async (studentId, name) => {
  return await studentModel.correctProfile(studentId, name);
};

const uploadProfilephoto = async (studentId, profilePhoto) => {
  return await studentModel.uploadProfilephoto(studentId, profilePhoto);
};

module.exports = { createStudent, loginStudent, correctProfile,refreshToken,uploadProfilephoto };

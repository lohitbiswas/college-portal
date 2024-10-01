const studentModel = require('../models/studentModel');

const createStudent = async (email, name, password) => {
  return await studentModel.createStudent(email, name, password);
};

const loginStudent = async (email, password) => {
  return await studentModel.loginStudent(email, password);
};

const correctProfile = async (studentId, name) => {
  return await studentModel.correctProfile(studentId, name);
};

module.exports = { createStudent, loginStudent, correctProfile };

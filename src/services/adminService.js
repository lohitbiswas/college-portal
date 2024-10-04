const adminModel = require('../models/adminModel');

const createAdmin = async (email, name, password) => {
  return await adminModel.createAdmin(email, name, password);
};

const loginAdmin = async (email, password) => {
  return await adminModel.loginAdmin(email, password);
};

const refresh_Token=async (refreshToken)=>{
  return await adminModel.refresh_Token(refreshToken);
}

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

const updateProfilePhoto=async (id, profilePhoto)=>{
  console.log(`photo upload hit service`);
  console.log(`photo upload hit service: ${id}`);
  console.log(`photo upload hit service: ${profilePhoto}`);
  return await adminModel.updateProfilePhoto(id,profilePhoto); 
}
module.exports = { createAdmin, loginAdmin,refresh_Token, getAllStudents,getStudentbyId,getstudentbyemail ,updateStudent,updateStudentProfile, updateProfilePhoto};

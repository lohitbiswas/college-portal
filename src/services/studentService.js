const studentModel = require('../models/studentModel');
const{ generateAccessToken,generateRefreshToken}=require('../utils/tokenUtils');


const createStudent = async (email, name, password) => {
  return await studentModel.createStudent(email, name, password);
};
const refreshToken = async (refreshToken) => {
  return await studentModel.refreshToken(refreshToken);
};
const loginStudent = async (email, password) => {
  return await studentModel.loginStudent(email, password);
};

// const googleLogin = async (googleId, email, name) => {
//   return await studentModel.googleLogin(googleId, email, name);
// };

const googleLogin = async (googleId, email, name, profilePhoto) => {
  console.log('Google login initiated',{googleId,email,name,profilePhoto});
  let student = await studentModel.findStudentByEmailOrGoogleId(email, googleId);
  
  if (!student) {
    console.log('No existing student found create a new one')
      student = await studentModel.createStudentWithGoogle(email, name, googleId, profilePhoto);
  }else{
    console.log('Existting student found !');
  }

  const accessToken = generateAccessToken(student);
  const refreshToken = generateRefreshToken(student);

  await studentModel.updateRefreshTokenWithGoogle(student.id, refreshToken);

  console.log('Student login successful:',{id:student.id});
  return {
      message: 'Login successful via Google',
      student: { id: student.id },
      accessToken,
      refreshToken,
  };
};


const correctProfile = async (studentId, name) => {
  return await studentModel.correctProfile(studentId, name);
};

const uploadProfilephoto = async (studentId, profilePhoto) => {
  return await studentModel.uploadProfilephoto(studentId, profilePhoto);
};

module.exports = { createStudent, loginStudent,googleLogin, correctProfile,refreshToken,uploadProfilephoto };

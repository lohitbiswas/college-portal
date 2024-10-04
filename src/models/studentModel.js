const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const{ generateAccessToken,generateRefreshToken}=require('../utils/tokenUtils');

// Student Model Logic
const createStudent = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.student.create({
    data: { email, name, password: hashedPassword },
  });
};

const loginStudent = async (email, password) => {
  const student = await prisma.student.findFirst({ where: { email } });
  console.log(`login model`)
  if (!student) throw new Error('Student not found');
  const isPasswordMatch = await bcrypt.compare(password, student.password);
  if (!isPasswordMatch) throw new Error('Invalid password');

  //const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const accessToken = generateAccessToken(student);
  const refreshToken = generateRefreshToken(student);

  await prisma.student.update({
    where: { id: student.id },
    data: { refreshToken }
});
  return { message: 'Login successful', student: { id: student.id }, accessToken ,refreshToken};
};

const refreshToken = async (oldRefreshToken) => {

  const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

  console.log(`${decoded}`);
    const student = await prisma.student.findFirst({
      where: {
        id: decoded.id,
        refreshToken: oldRefreshToken 
      }
    });

  console.log(`student:${student.name}`);
  if (!student) throw new Error('Invalid refresh token');

  const newAccessToken = generateAccessToken(student);
  const newRefreshToken = generateRefreshToken(student);

 
  await prisma.student.update({
      where: { id: student.id },
      data: { refreshToken: newRefreshToken }
  });

  return { message:'Refresh token and access token renewed',student: { id: student.id,name:student.email },accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const correctProfile = async (studentId, name) => {
  const student= await prisma.student.update({
    where: { id: studentId },
    data: { name: name },
  });
  return student;
};

const uploadProfilephoto = async (studentId, profilePhoto) => {
  console.log(`file-path is : ${profilePhoto}`)
  console.log(`Stuent ID is : ${studentId}`)
  const student= await prisma.student.update({
    where: { id: studentId },
    data: { profilePhoto: profilePhoto },
  });
  return student;
};

module.exports = { createStudent, loginStudent, refreshToken, correctProfile ,uploadProfilephoto};

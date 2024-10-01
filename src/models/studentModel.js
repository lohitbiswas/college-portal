const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Student Model Logic
const createStudent = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.student.create({
    data: { email, name, password: hashedPassword },
  });
};

const loginStudent = async (email, password) => {
  const student = await prisma.student.findFirst({ where: { email } });
  if (!student) throw new Error('Student not found');
  const isPasswordMatch = await bcrypt.compare(password, student.password);
  if (!isPasswordMatch) throw new Error('Invalid password');

  const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', student: { id: student.id }, token };
};

const correctProfile = async (studentId, name) => {
  const student= await prisma.student.update({
    where: { id: studentId },
    data: { name: name },
  });
  return student;
};

module.exports = { createStudent, loginStudent, correctProfile };

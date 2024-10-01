const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Admin Model Logic
const createAdmin = async (email, name, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.admin.create({
    data: { email, name, password: hashedPassword },
  });
};

const loginAdmin = async (email, password) => {
  const admin = await prisma.admin.findFirst({ where: { email } });
  if (!admin) throw new Error('Admin not found');
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) throw new Error('Invalid password');

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', token };
};

const getAllStudents = async () => {
  return await prisma.student.findMany();
};

const getStudentbyId = async (id) => {
    try {
      const user = await prisma.student.findUnique({
        where: {
           id:parseInt(id)
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Database query failed'); // This will be caught in app.js
    }
  };

  const getstudentbyemail = async (email) => {
    return await prisma.student.findUnique({
        where: {
            email,
        }
    });
};


const updateStudent = async (id,email) => {
    try {
        const updateUser = await prisma.student.update({
            where: {
              id:parseInt(id)
            },
            data: {
                email:email
              
            },
          })
      return updateUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Database query failed'); // This will be caught in app.js
    }
};

const updateStudentProfile = async (id,profile) => {
    try {
        const updateUser = await prisma.student.update({
            where: {
              id:parseInt(id)
            },
            data: {
                profile:profile
              
            },
          })
      return updateUser;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Database query failed'); // This will be caught in app.js
    }
};
  

module.exports = { createAdmin, loginAdmin, getAllStudents ,getStudentbyId,getstudentbyemail,updateStudent,updateStudentProfile};

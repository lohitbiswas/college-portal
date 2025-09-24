

const { loginStudent } = require('../models/studentModel'); 
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

describe('loginStudent', () => {
  const mockStudentData = {
    email: 'testlogin@example.com',
    name: 'Login Test Student',
    password: 'password123', 
  };

  let student; 

  beforeAll(async () => {
    
    const hashedPassword = await bcrypt.hash(mockStudentData.password, 10);

   
    student = await prisma.student.create({
      data: {
        email: mockStudentData.email,
        name: mockStudentData.name,
        password: hashedPassword, 
      },
    });
  });

  afterAll(async () => {

    await prisma.student.delete({ where: { id: student.id } });
    await prisma.$disconnect();
  });

  it('should log in a student with correct email and password', async () => {
    const result = await loginStudent(mockStudentData.email, mockStudentData.password);

    // Assertions
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result.student.id).toBe(student.id);
    expect(result.message).toBe('Login successful');
  });

  it('should throw an error if student does not exist', async () => {
    await expect(loginStudent('nonexistent@example.com', 'password'))
      .rejects
      .toThrow('Student not found');
  });

  it('should throw an error if the password is incorrect', async () => {
    await expect(loginStudent(mockStudentData.email, 'wrongpassword'))
      .rejects
      .toThrow('Invalid password');
  });
});


/*const { createStudent } = require('../models/studentModel'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Create Student API', () => {
    beforeAll(async () => {
        await prisma.student.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a new student', async () => {
        const response = await request(app)
            .post('/student/create') 
            .send({
                email: 'test@example.com',
                name: 'Test Student',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});

*/

/*describe('Create Student', () => {
    test('should create a student successfully', () => {
      expect(true).toBe(true); // Replace this with your actual test logic
    });
  });
*/

const { createStudent } = require('../models/studentModel'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('createStudent', () => {
  const mockStudentData = {
    email: 'test@example.com',
    name: 'Test Student',
    password: 'password123'
  };

  afterAll(async () => {
    // Clean up the test data
    await prisma.student.deleteMany({ where: { email: mockStudentData.email } });
    await prisma.$disconnect();
  });

  it('should create a new student with hashed password', async () => {
    
    const result = await createStudent(mockStudentData.email, mockStudentData.name, mockStudentData.password);

   
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(mockStudentData.email);
    expect(result.name).toBe(mockStudentData.name);
    expect(result.password).not.toBe(mockStudentData.password); 

    // Clean up after the test
    await prisma.student.delete({ where: { id: result.id } });
  });
});

 
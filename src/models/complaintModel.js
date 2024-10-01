const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createComplaint = async (studentId, subject, description) => {
    return await prisma.complaint.create({
        data: {
            studentId,
            subject,
            description,
        }
    });
};

const getAllComplaints = async () => {
    return await prisma.complaint.findMany({
        // include: { student: true },
    });
};

const respondToComplaint = async (id, response) => {
    return await prisma.complaint.update({
        where: { id: parseInt(id) },
        data: { response, status: 'Resolved' }
    });
};

module.exports = { createComplaint, getAllComplaints, respondToComplaint };

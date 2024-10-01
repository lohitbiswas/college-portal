const complaintModel = require('../models/complaintModel');

const registerComplaint = async (studentId, subject, description) => {
    return await complaintModel.createComplaint(studentId, subject, description);
};

const viewAllComplaints = async () => {
    return await complaintModel.getAllComplaints();
};

const resolveComplaint = async (id, response) => {
    return await complaintModel.respondToComplaint(id, response);
};

module.exports = { registerComplaint, viewAllComplaints, resolveComplaint };

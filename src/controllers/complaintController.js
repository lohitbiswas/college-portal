const complaintService = require('../services/complainService');

const registerComplaint = async (req, res) => {
    const { subject, description } = req.body;
    const studentId = req.user.id;  // Assuming JWT middleware adds the student id to req.user

    try {
        const complaint = await complaintService.registerComplaint(studentId, subject, description);
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.viewAllComplaints();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const respondToComplaint = async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;

    try {
        const updatedComplaint = await complaintService.resolveComplaint(id, response);
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerComplaint, getAllComplaints, respondToComplaint };

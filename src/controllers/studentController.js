const studentService = require('../services/studentService');

const createStudent = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newStudent = await studentService.createStudent(email, name, password);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await studentService.loginStudent(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
      const tokens = await studentService.refreshToken(refreshToken);
      res.status(200).json(tokens);
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
};
const correctProfile = async (req, res) => {
  const { name } = req.body;
  const studentId = req.user.id;
  try {
    const updatedProfile = await studentService.correctProfile(studentId, name);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadProfilePhoto = async (req, res) => {
  
  console.log(`controller`, req.body);
  //console.log(`${req.file.path}`);
const studentId=req.user.id;// this thing works but when i pass const {studentID}=req.body  it give me error why?
  // console.log(`${JSON.stringify(req.body)}`);
  const profilePhoto=req.file.path;
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      const updateprofilephoto= await studentService.uploadProfilephoto(studentId,profilePhoto);
    
    //   const updatedStudent = await prisma.student.update({
    //     where: { id: req.user.id },
    //     data: { profilePhoto: req.file.path } 
    // });

      res.status(200).json({ message: 'Profile photo uploaded successfully', data: updateprofilephoto });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = { createStudent, loginStudent, correctProfile, uploadProfilePhoto,refreshToken };

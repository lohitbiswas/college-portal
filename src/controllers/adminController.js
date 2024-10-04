const adminService = require('../services/adminService');

const createAdmin = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const newAdmin = await adminService.createAdmin(email, name, password);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await adminService.loginAdmin(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const refresh_Token=async(req,res)=>{
  const{refreshToken}=req.body
  try{
    const refreshT= await adminService.refresh_Token(refreshToken);
    res.status(200).json(refreshT);
  }catch(error){
    res.status(401).json({error:error.message});
  }
}
const getAllStudents = async (req, res) => {
  try {
    const students = await adminService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentbyId = async (req, res) => {
    const { id } = req.params;
    console.log(`Querying for user with id: ${id}`);
    try {
      const students = await adminService.getStudentbyId(id);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getstudentbyemail = async (req, res) => {
    const { email } = req.params;
    console.log(`Querying for user with email: ${email}`);
    try {
      const students = await adminService.getstudentbyemail(email);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateStudent = async (req, res) => {
    const{ id}=req.params;
    const { email } = req.body;
    console.log(`Querying for user with email: ${id}`);
    try {
      const students = await adminService.updateStudent(id,email);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateStudentprofile = async (req, res) => {
    const{ id}=req.params;
    const { profile } = req.body;
    console.log(`Querying for user with profileID: ${id}`);
    try {
      const students = await adminService.updateStudentProfile(id,profile);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const uploadProfilePhoto=async (req,res)=>{
    //const {id}=req.body;
    const id=req.user.id
    const profilePhoto= req.file.path;
    console.log(`${id}`);
    console.log(`${profilePhoto}`);
    try{
      if(!req.file){
        return res.status(400).json({message:'No file is uploaded'})
      }
      const updateProfilePhoto= await adminService.updateProfilePhoto(id,profilePhoto);
      res.status(200).json({ message: 'Profile photo uploaded successfully', data: updateProfilePhoto });
    }
    catch(error){
      res.status(500).json({error: error.message})
    }
  }

const deleteStudent=async(req,res)=>{
  console.log(`delete controller`);
  const {id}=req.params;
  console.log(`delete controller id:${id}`);
  try{
    const deleteStu=await adminService.deleteStudent(id);
    res.status(200).json(deleteStu);
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}

module.exports = { createAdmin, loginAdmin,refresh_Token, getAllStudents , getStudentbyId, getstudentbyemail, updateStudent, updateStudentprofile,uploadProfilePhoto,deleteStudent};

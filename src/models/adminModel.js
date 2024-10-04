const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{ generateAccessToken,generateRefreshToken}=require('../utils/tokenUtils');
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

  const accessToken=generateAccessToken(admin);
  const refreshToken=generateRefreshToken(admin);

  await prisma.admin.update({
    where:{id:admin.id},
    data:{refreshToken}
  })
  //const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { message: 'Login successful', admin:{id:admin.id}, accessToken, refreshToken};
};

const refresh_Token=async (Old_token)=>{
 const decoded_admin=jwt.verify(Old_token,process.env.JWT_REFRESH_SECRET);

console.log(`admin model:${decoded_admin}`);

 const admin= await prisma.admin.findFirst({
  where:{
    id:decoded_admin.id,
    refreshToken:Old_token
  }
});

console.log(`Admin Model Name:${admin.name}`);
if(!admin){
  console.error(`Invalid refresh token`);
}

const newaccessToken=generateAccessToken(admin);
const newrefreshToken=generateRefreshToken(admin);

await prisma.admin.update({
  where:{id:admin.id},
  data:{refreshToken:newrefreshToken}
})

return {message:'Refresh and Access token renewed',admin:{name:admin.name},accessToken: newaccessToken, refreshToken: newrefreshToken};
}

// const refresh_Token = async (Old_token) => {
//   try {
//     const decoded_admin = jwt.verify(Old_token, process.env.JWT_REFRESH_SECRET);
//     console.log(`Decoded admin: ${JSON.stringify(decoded_admin)}`);

//     // Fetch admin with matching ID and refresh token
//     const admin = await prisma.admin.findFirst({
//       where: {
//         id: decoded_admin.id,
//         refreshToken: Old_token,
//       },
//     });

//     console.log(`Admin found: ${admin ? admin.name : 'Not found'}`);

//     if (!admin) {
//       console.error('Invalid refresh token');
//       return { error: 'Invalid refresh token' };
//     }

//     const newaccessToken = generateAccessToken(admin);
//     const newrefreshToken = generateRefreshToken(admin);

//     await prisma.admin.update({
//       where: { id: admin.id },
//       data: { refreshToken: newrefreshToken },
//     });

//     return {
//       message: 'Refresh and Access token renewed',
//       admin: { name: admin.name },
//       accessToken: newaccessToken,
//       refreshToken: newrefreshToken,
//     };
//   } catch (error) {
//     console.error('Error in refreshing token:', error);
//     return { error: 'Failed to refresh token' };
//   }
// };


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
  
const updateProfilePhoto=async(id,profilephoto)=>{
  console.log(`photo upload hit model`);
  // console.log(`file-path is : ${profilePhoto}`);
  console.log(`id is:${id}`);
  try{
    const updateUser=await prisma.admin.update({
      where:{id:parseInt(id)},
      data:{profilePhoto:profilephoto}
    });
    return updateUser;
  }catch(error){
    throw new Error('DataBase Query falied');
  }
}

module.exports = { createAdmin, loginAdmin,refresh_Token, getAllStudents ,getStudentbyId,getstudentbyemail,updateStudent,updateStudentProfile,updateProfilePhoto};

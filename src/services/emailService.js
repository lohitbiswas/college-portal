const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lohitkrbiswas.2001@gmail.com', 
    pass: 'bmoxfwosuhdaytxs', 
  },
});


const sendMail = (email, name) => {
  const mailOptions = {
    from: 'lohitkrbiswas.2001@gmail.com', 
    to: email, 
    subject: 'Profile Created',
    text: `Hi ${name}, your profile has been created successfully!`, 
  };

  
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendMail };

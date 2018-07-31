var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benedictpraveen99@gmail.com',
    pass: '9488055410'
  }
});

var mailOptions = {
  from: 'benedictpraveen99@gmail.com',
  to: 'jbapraveen@hotmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
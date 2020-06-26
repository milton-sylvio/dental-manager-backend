import nodemailer from 'nodemailer'

const host = 'mail.dentalmanager.com.br'   // The emailto use in sending the email
const mail = 'no-reply@dentalmanager.com.br'  // password of the email to use
const password = ';1N9Rp5.AxEb'  // password of the email to use

const transporter = nodemailer.createTransport({
  host: host,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
  	user: mail,
  	pass: password
  }/* ,
  tls: { rejectUnauthorized: false } */
});

const mailOptions = {
  from: mail,
  to: 'destinatario@yahoo.com',
  subject: 'E-mail enviado usando Node!',
  text: 'Bem fácil, não? ;)'
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});

// const EmailTemplate = require('email-templates').EmailTemplate;

// const transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// // create template based sender function
// // assumes text.{ext} and html.{ext} in template/directory
// let sendResetPasswordLink = transporter.templateSender(
//   new EmailTemplate('./templates/resetPassword'), {
//     from: 'hello@yourdomain.com',
//   });

// exports.sendPasswordReset = function (email, username, name, tokenUrl) {
//   // transporter.template
//   sendResetPasswordLink({
//     to: email,
//     subject: 'Redefinir Senha - Dental Manager'
//   }, {
//     name: name,
//     username: username,
//     token: tokenUrl
//   }, function (err, info) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Link sent\n'+ JSON.stringify(info));
//     }
//   });
// };
import config from 'config';
import path from 'path';
import nodemailer from 'nodemailer';
const EmailTemplate = require('email-templates-v2').EmailTemplate;

const host = config.get('email.host');
const port = config.get('email.port');
const user = config.get('email.user');
const passw = config.get('email.passw');
const secure = config.get('email.secure');
const project = config.get('project.name')

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: secure, // true for 465, false for other ports
  auth: {
    user: user,
    pass: passw
  }
});

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
export function configSendMail (modelTemplate, to, subject, locals) {
  const templatesDir = path.resolve(__dirname, '..', 'templates')
  const template = new EmailTemplate(path.join(templatesDir, modelTemplate))
  
  template.render(locals, (err, temp) => {
    if (err) {
      console.log('Erro na renderização:', err);
    } else {
      transporter.sendMail({
        from: `Dental Manager <${user}>`,
        to: to,
        subject: `${subject} - ${project}`,
        html: temp.html,
        text: temp.text
      }, function (error, info) {
        let msg = error ? error : `Message sent: ${info.message}`;
        console.log(msg);
      })
    }
  }) 
}

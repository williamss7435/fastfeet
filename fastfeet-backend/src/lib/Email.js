const Nodemailer = require('nodemailer');
const EmailConfig = require('../config/email');

class Email {
  constructor() {
    this.nodemailer = Nodemailer.createTransport(EmailConfig);
  }

  sendEmail(to, from, subject, html) {
    this.nodemailer.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}

module.exports = new Email();

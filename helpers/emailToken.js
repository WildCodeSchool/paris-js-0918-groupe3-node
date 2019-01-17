require("dotenv").config();
const nodemailer = require("nodemailer");
const password = process.env.GMAIL_PASS;

module.exports = (to, url) => {
  let smtpTransporter = nodemailer.createTransport({
    service: `gmail`,
    host: "smtp.gmail.com",
    auth: {
      user: `dessinemoiunjob@gmail.com`,
      pass: password
    }
  });

  let mailOptions = {
    from: "jeremy <dessinemoiunjob@gmail.com>", // sender address
    to: to, // list of receivers
    subject: "Validation inscription", // Subject line
    html: `<p>Veuillez confirmer votre adresse mail en cliquant sur le lien suivant : <a href="${url}">CLIQUEZ ICI</a> </p>`
  };
  smtpTransporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      return console.log(error);
    }
    console.log("message envoyé");

    return response;
  });
};

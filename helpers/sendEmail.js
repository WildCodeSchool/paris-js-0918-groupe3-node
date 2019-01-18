require("dotenv").config();
const nodemailer = require("nodemailer");
const password = process.env.GMAIL_PASS;

module.exports = (mailOptions) =>{
  
    let smtpTransporter = nodemailer.createTransport({
      service: `gmail`,
      host: "smtp.gmail.com",
      auth: {
        user: `dessinemoiunjob@gmail.com`,
        pass: password
      }
    });

    smtpTransporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          return console.log(error);
        }
        console.log("message envoyé");
        return response;
      });
}
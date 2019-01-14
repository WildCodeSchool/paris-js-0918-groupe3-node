require("dotenv").config();
const nodemailer = require("nodemailer");
const password = process.env.GMAIL_PASS;

module.exports = (to, candidate, offer) => {
  let smtpTransporter = nodemailer.createTransport({
    service: `gmail`,
    host: "smtp.gmail.com",
    auth: {
      user: `jemyplu@gmail.com`,
      pass: password
    }
  });

  let mailOptions = {
    from: "jeremy <jemyplu@gmail.com>", // sender address
    to: to, // list of receivers
    subject: "Candidature validée", // Subject line
    html: `<p>Vous venez de valider la candidature de ce candidat: email : ${
      candidate.email
    } téléphone : ${candidate.phone} pour l'offre : ${offer.title} en ${
      offer.contract_type
    } à ${offer.place}</p>`
  };
  smtpTransporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      return console.log(error);
    }
    console.log("message envoyé");

    return response;
  });
};

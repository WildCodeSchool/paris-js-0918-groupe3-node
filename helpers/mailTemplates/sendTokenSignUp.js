module.exports = (to, url) => {
  return {
      from: " DmJ <dessinemoiunjob@gmail.com>", // sender address
      to: to, // list of receivers
      subject: "Validation inscription", // Subject line
      html: `<h2>Bonjour,</h2>
      <h3>Bienvenur sur Dessine-moi un job</h3>
      <p>Veuillez confirmer votre adresse mail en cliquant sur ce lien : <a href="${url}">VALIDER MON EMAIL</a></p>`
  };
};
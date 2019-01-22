module.exports = (to, url) => {
  return {
      from: "DmJ <dessinemoiunjob@gmail.com>", // sender address
      to: to, // list of receivers
      subject: "Demande de nouveau mot de passe", // Subject line
      html: `<h2>Bonjour,</h2>
      <h3>Vous souhaitez modifier votre mot de passe</h3>
      <p>Vous pouvez cliquer sur ce lien : <a href="${url}">MODIFIER MON MOT DE PASSE</a></p>`
  };
};
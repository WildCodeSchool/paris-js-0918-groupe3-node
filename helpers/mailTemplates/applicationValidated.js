module.exports = (to, candidate, offer) => {
  return {
    from: "DmJ <dessinemoiunjob@gmail.com>",
    to: to,
    subject: "Candidature validée",
    html: `<h2>Bonjour,</h2>
    <h4>Vous venez de valider la candidature de ce candidat:</h4>
    <p>Email : <b>${candidate.email}</b>
      <br/>Téléphone : <b>${candidate.phone}</b>
      <br/>concernant l'offre : <b>${offer.title}</b> en <b>${offer.contract_type}</b> à <b>${offer.place}</b></p>`
  };
};
module.exports = (to, candidate, offer) => {
  return {
    from: "DmJ <dessinemoiunjob@gmail.com>",
    to: to,
    subject: "Candidature validée",
    html: `<p>Vous venez de valider la candidature de ce candidat: email : ${
      candidate.email
    } téléphone : ${candidate.phone} pour l'offre : ${offer.title} en ${
      offer.contract_type
    } à ${offer.place}</p>`
  };
};
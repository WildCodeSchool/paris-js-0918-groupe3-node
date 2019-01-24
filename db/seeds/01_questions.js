
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, text: 'Une réalisation, perso ou pro, dont vous êtes fier-e et qui servirait pour ce job.', is_custom: false},
        {id: 2, text: 'A votre avis, qu’est-ce qui pourrait être amélioré dans notre entreprise ?', is_custom: false},
        {id: 3, text: 'Quel a été votre « plus bel échec » ?', is_custom: false},
        {id: 4, text: 'Trois mois après votre embauche, on fait le point. Et voilà ce que vous avez apporté…', is_custom: false},
        {id: 5, text: 'Pour vous, être heureux dans son travail, c’est quoi ? Le salaire ? L’équipe ? La possibilité d’évoluer ? La machine à café ?', is_custom: false},
        {id: 6, text: 'Vous avez quelque chose à nous dire, un élément à nous envoyer pour nous convaincre ? Allez-y !', is_custom: false},
      ]);
    });
};
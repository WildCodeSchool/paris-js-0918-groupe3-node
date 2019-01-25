
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('offers').del()
    .then(function () {
      // Inserts seed entries
      return knex('offers').insert([
        {
          id: 1,
          title: 'Formateur Java',
          description: 'Phasellus fringilla tortor non nunc iaculis convallis. Pellentesque ultricies nisl eget arcu finibus, ac malesuada massa tempor. Aliquam ac lorem in ligula placerat vulputate. Donec ac tellus lectus. Nullam nunc sem, molestie sit amet elementum eu, interdum vitae neque. Etiam nec augue sed sem egestas suscipit in a sapien. Aenean facilisis tempus nulla, ut aliquam massa dictum et. Curabitur quis metus mollis, blandit est at, sodales ex. Maecenas non vehicula elit. Donec vel sollicitudin lorem.',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
        {
          id: 2,
          title: 'Campus Manager',
          description: 'Pellentesque et risus varius, cursus augue at, tincidunt ipsum. Curabitur posuere, sapien eu vulputate posuere, ante nunc lobortis diam, sit amet tincidunt libero erat vehicula turpis. Maecenas nisl augue, convallis quis lacinia eu, euismod ac velit. Vestibulum sit amet congue dolor, aliquam vulputate diam. Duis posuere commodo molestie. Phasellus efficitur nec lacus non ornare. Donec semper gravida eros, nec elementum massa tincidunt sed. Cras sem elit, faucibus non malesuada ut, suscipit sit amet nulla. Vivamus rutrum bibendum accumsan. Vivamus sed ligula vestibulum, viverra quam a, maximus magna. Integer ullamcorper, mauris sit amet porta pharetra, velit purus pellentesque risus, quis feugiat nunc nulla id massa. Aliquam turpis neque, pretium quis mi ut, sollicitudin convallis ligula. Mauris diam neque, gravida id lorem in, volutpat gravida justo. Nulla facilisi. Nam volutpat nisl feugiat nisi convallis sodales.',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
        {
          id: 3,
          title: 'Formateur JavaScript',
          description: 'Sed viverra in erat in laoreet. Nam non magna tincidunt, dignissim neque eu, ornare augue. Quisque eget porta nulla. Etiam quis pretium est. Sed a mauris diam. Phasellus in viverra lorem. Morbi aliquam in arcu at feugiat. Nam commodo tristique ex, non sollicitudin erat congue nec. Sed ipsum mauris, mattis in mi non, ultrices viverra mi. Donec iaculis luctus enim. Morbi lacinia orci nec nunc pretium iaculis.',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:1
        },
        {
          id: 4,
          title: 'Marketing Manager',
          description: 'Phasellus fringilla tortor non nunc iaculis convallis. Pellentesque ultricies nisl eget arcu finibus, ac malesuada massa tempor. Aliquam ac lorem in ligula placerat vulputate. Donec ac tellus lectus. Nullam nunc sem, molestie sit amet elementum eu, interdum vitae neque. Etiam nec augue sed sem egestas suscipit in a sapien. Aenean facilisis tempus nulla, ut aliquam massa dictum et. Curabitur quis metus mollis, blandit est at, sodales ex. Maecenas non vehicula elit. Donec vel sollicitudin lorem.',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:2,
        },
        {
          id: 5,
          title: 'Marketing Manager',
          description: 'Phasellus fringilla tortor non nunc iaculis convallis. Pellentesque ultricies nisl eget arcu finibus, ac malesuada massa tempor. Aliquam ac lorem in ligula placerat vulputate. Donec ac tellus lectus. Nullam nunc sem, molestie sit amet elementum eu, interdum vitae neque. Etiam nec augue sed sem egestas suscipit in a sapien. Aenean facilisis tempus nulla, ut aliquam massa dictum et. Curabitur quis metus mollis, blandit est at, sodales ex. Maecenas non vehicula elit. Donec vel sollicitudin lorem.',
          contract_type: 'CDD',
          place: 'Toulouse (31)',
          is_active: true,
          is_published: true,
          id_companies:2,
        },
        {
          id: 6,
          title: 'Developpeur logiciel',
          description: 'Phasellus fringilla tortor non nunc iaculis convallis. Pellentesque ultricies nisl eget arcu finibus, ac malesuada massa tempor. Aliquam ac lorem in ligula placerat vulputate. Donec ac tellus lectus. Nullam nunc sem, molestie sit amet elementum eu, interdum vitae neque. Etiam nec augue sed sem egestas suscipit in a sapien. Aenean facilisis tempus nulla, ut aliquam massa dictum et. Curabitur quis metus mollis, blandit est at, sodales ex. Maecenas non vehicula elit. Donec vel sollicitudin lorem.',
          contract_type: 'CDD',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:3,
        },
        {
          id: 7,
          title: 'Developpeur web',
          description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut eget nunc id magna sollicitudin dictum non nec purus. Aliquam accumsan tellus nulla, a pretium orci fermentum sed. Nulla facilisi. Fusce vel nisi libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          contract_type: 'CDI',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:3,
        },
        {
          id: 8,
          title: 'Developpeur web',
          description: 'Nam vel eleifend enim, id faucibus erat. Vestibulum luctus magna id porttitor consectetur. Sed finibus dolor eu libero tempor, eu fringilla urna porta. Sed pharetra lectus risus, et viverra purus laoreet ac. Curabitur at suscipit urna. Quisque posuere nisi magna, vel porta arcu ultricies ut. Fusce vitae fermentum massa. Nullam eget lorem malesuada, luctus arcu sit amet, dictum orci. Pellentesque in tellus eu nibh euismod ornare. Nulla suscipit, elit eget tristique luctus, massa justo rhoncus metus, at tempor enim mauris in libero. Praesent semper, nisi ac fringilla tincidunt, justo erat auctor quam, id aliquam felis dui at erat. Sed a quam odio. Aliquam mattis, turpis at lobortis viverra, enim turpis commodo risus, a malesuada leo quam vitae odio.',
          contract_type: 'Stage',
          place: 'Paris (75)',
          is_active: true,
          is_published: true,
          id_companies:3,
        },
      ]);
    });
};

// const request = require('../request');
// const db = require('../db');

// describe('film api', () => {
//   beforeEach(() => {
//     return Promise.all([
//       db.dropCollection('reviews'),
//       db.dropCollection('reviewers'),
//       db.dropCollection('films')
//     ]);
//   });

//   const studio = {
//     name: 'Studio A',
//     address: {
//       city: 'Portland',
//       state: 'OR',
//       country: 'US'
//     }
//   };

//   const actor = {
//     name: 'Jonny Karate',
//     dob: new Date('January 1 1995'),
//     pob: 'Oregon'
//   };

//   const film = {
//     title: 'Film A',
//     released: 2019,
//     cast: [{
//       role: 'Hero'
//     }]
//   };

//   function postFilm(film) {
//     return request
//       .post('api/studios')
//       .send(studio)
//       .expect(200)
//       .then(({ body }) => {
//         film.studio = body._id;
//         return request
//           .post
//       })
//   }

//   it('nothing', () => {

//   });
// });
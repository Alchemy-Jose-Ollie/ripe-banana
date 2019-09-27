// const request = require('../request');
// const db = require('../db');

// describe('actors api', () => {
//   beforeEach(() => {
//     return db.dropCollection('actors');
//   });

//   const actor = {
//     name: 'Jonny Karate',
//     dob: new Date('January 1 1995'),
//     pob: 'Oregon'
//   };

//   function postStudio(actor) {
//     return request
//       .post('/api/actors')
//       .send(studio)
//       .expect(200)
//       .then(({ body }) => body);
//   }

//   it('post a studio', () => {
//     return postStudio(studio).then(studio => {
//       expect(studio).toEqual({
//         _id: expect.any(String),
//         __v: 0,
//         ...studio
//       });
//     });
//   });

//   it('gets a studio by id', () => {
//     return postStudio(studio)
//       .then(studio => {
//         return request.get(`/api/actors/${studio._id}`)
//           .expect(200)
//           .then(({ body }) => {
//             expect(body).toEqual(studio);
//           });
//       });
//   });

//   it('gets a list of actors', () => {
//     const firstStudio = {
//       name: 'First Studio',
//       address: {
//         city: 'Orlando',
//         state: 'Florida',
//         country: 'USA'
//       }
//     };
//     return Promise.all([
//       postStudio(firstStudio),
//       postStudio({ name: 'Second Studio' }),
//       postStudio({ name: 'Third Studio' })
//     ])
//       .then(() => {
//         return request.get('/api/actors').expect(200);
//       })
//       .then(({ body }) => {
//         expect(body.length).toBe(3);
//         expect(body[0]).toEqual({
//           _id: expect.any(String),
//           __v: expect.any(Number),
//           name: firstStudio.name,
//           address: {
//             city: firstStudio.address.city,
//             state: firstStudio.address.state,
//             country: firstStudio.address.country
//           }
//         });
//       }); 
//   });
// });
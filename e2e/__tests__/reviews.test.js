// const request = require('../request');
// const db = require('../db');

// describe('review api', () => {
//   beforeEach(() => {
//     return Promise.all([
//       db.dropCollection('reviews'),
//       db.dropCollection('reviewers'),
//       db.dropCollection('films')
//     ]);
//   });

//   const reviewer = {
//     name: 'Jose Ojeda',
//     company: 'Alchemy'
//   };

//   const review = {
//     rating: 4,
//     reviewer: {},
//     review: 'This movie was kind of amazing',
//     film: new ObjectId(),
//   };

//   function postReview(review) {
//     return request  
//       .post('/api/reviewers')
//       .send(reviewer)
//       .expect(200)
//       .then(({ body }) => {
//         review.reviewer[0] = 
//       })
//   }
// });
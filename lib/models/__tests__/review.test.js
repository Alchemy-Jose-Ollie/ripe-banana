// const Review = require('../review');
// const { ObjectId } = require('mongoose').Types;

// describe('Review model', () => {
//   it('valid model all properties', () => {
//     const data = {
//       rating: 4,
//       reviewer: new ObjectId(),
//       review: 'This movie was kind of amazing',
//       film: new ObjectId(),
//     };

//     const reviewer = new Reviewer(data);
//     const errors = reviewer.validateSync();
//     expect(errors).toBeUndefined();

//     const json = reviewer.toJSON();

//     expect(json).toEqual({
//       ...data,
//       _id: expect.any(Object)
//     });
//   });

  // it('validates required properties', () => {
  //   const data = {};
  //   const reviewer = new Reviewer(data);
  //   const { errors } = reviewer.validateSync();

  //   expect(errors.name.kind).toBe('required');
  //   expect(errors.company.kind).toBe('required');
  // });

// });
const request = require('../request');
const db = require('../db');

describe('review api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('reviews'),
      db.dropCollection('reviewers'),
      db.dropCollection('films')
    ]);
  });

  const reviewer = {
    name: 'Jose Ojeda',
    company: 'Alchemy'
  };

  const review = {
    rating: 4,
    review: 'This movie was kind of amazing'
  };

  function postReview(review) {
    return request
      .post('/api/reviewers')
      .send(reviewer)
      .expect(200)
      .then(({ body }) => {
        review.reviewer = body._id;
        return request
          .post('/api/reviews')
          .send(review)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(review).then(review => {
      expect(review).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          reviewer: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "rating": 4,
          "review": "This movie was kind of amazing",
          "reviewer": Any<String>,
        }
      `
      );
    });
  });

  it('gets a review by id', () => {
    return postReview(review).then(savedReview => {
      return request
        .get(`/api/reviews/${savedReview._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              __v: 0,
              _id: expect.any(String),
              reviewer: expect.any(Object),
              rating: 4,
              review: 'This movie was kind of amazing'
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "rating": 4,
              "review": "This movie was kind of amazing",
              "reviewer": Any<Object>,
            }
            `
          );
        });
    });
  });

  it('gets a list of reviews', () => {
    const firstReviews = {
      rating: 4,
      review: 'This movie was kind of amazing'
    };
    return Promise.all([
      postReview(firstReviews),
      postReview({ rating: 4, review: 'This movie was kind of amazing' }),
      postReview({ rating: 4, review: 'This movie was kind of amazing' })
    ])
      .then(() => {
        return request.get('/api/reviews').expect(200)
     
          .then(({ body }) => {      
            expect(body.length).toBe(3);
            expect(body[0]).toMatchInlineSnapshot(
              {
                __v: 0,
                _id: expect.any(String),
                reviewer: expect.any(Object),
                rating: 4,
                review: 'This movie was kind of amazing'
              },
              `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "rating": 4,
            "review": "This movie was kind of amazing",
            "reviewer": Any<Object>,
          }
        `
            );
          });
      });
  });
});

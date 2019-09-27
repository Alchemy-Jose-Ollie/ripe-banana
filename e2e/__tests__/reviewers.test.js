const request = require('../request');
const db = require('../db');

describe('reviewers api', () => {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });

  const reviewer = {
    name: 'Jose Ojeda',
    company: 'Alchemy'
  };

  function postReviewer(reviewer) {
    return request 
      .post('/api/reviewers')
      .send(reviewer)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a reviewer', () => {
    return postReviewer(reviewer).then(reviewer => {
      expect(reviewer).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...reviewer
      });
    });
  });

  it('gets a reviewer by id', () => {
    return postReviewer(reviewer)
      .then(reviewer => {
        return request.get(`/api/reviewers/${reviewer._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(reviewer);
          });
      });
  });

});
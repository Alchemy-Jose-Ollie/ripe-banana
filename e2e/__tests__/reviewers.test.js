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

  it('get a list of reviewers', () => {
    const firstReviewer = {
      name: 'Jose Ojeda',
      company: 'Alchemy'
    };

    return Promise.all([
      postReviewer(firstReviewer),
      postReviewer({ name: 'Josb Ojeda', company: 'Alchemy' }),
      postReviewer({ name: 'Josc Ojeda', company: 'Alchemy' })
    ])
      .then(() => {
        return request.get('/api/reviewers')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        console.log(body[0]);
        
        expect(body[0]).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: firstReviewer.name,
          company: firstReviewer.company
        });
      });
  });

  it('updates a reviewer', () => {
    return postReviewer(reviewer)
      .then(reviewer => {
        reviewer.company = 'Alchemy Lab';
        return request
          .put(`/api/reviewers/${reviewer._id}`)
          .send(reviewer)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.company).toBe('Alchemy Lab');
      });
  });

});
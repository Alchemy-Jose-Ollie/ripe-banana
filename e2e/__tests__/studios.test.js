const request = require('../request');
const db = require('../db');

describe('studios api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const studio = {
    name: 'Studio A',
    address: {
      city: 'Portland',
      state: 'OR',
      country: 'US'
    }
  };

  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a studio', () => {
    return postStudio(studio).then(studio => {
      expect(studio).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...studio
      });
    });
  });

  // it('gets a studio by id', () => {
    // return postStudio(studio).then(studio => {
      // return request
        // .post('/api/studios')
        // .send({
          // _id: expect.any(String),
          // title: expect.any(String)
        // })
        // .expect(200)
        // .then(() => {
          // return request.get(`/api/studios/${studio._id}`).expect(200);
        // })
        // .then(({ body }) => {
          // expect(body).toMatchInlineSnapshot(
            // _
          // )
        // })
    // })
  // });
});
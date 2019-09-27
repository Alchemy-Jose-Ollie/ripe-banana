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

  it('gets a studio by id', () => {
    return postStudio(studio)
      .then(studio => {
        return request.get(`/api/studios/${studio._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(studio);
          });
      });
  });

  it('gets a list of studios', () => {
    const firstStudio = {
      name: 'First Studio',
      address: {
        city: 'Orlando',
        state: 'Florida',
        country: 'USA'
      }
    };
    return Promise.all([
      postStudio(firstStudio),
      postStudio({ name: 'Second Studio' }),
      postStudio({ name: 'Third Studio' })
    ])
      .then(() => {
        return request.get('/api/studios').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toEqual({
          _id: expect.any(String),
          name: firstStudio.name
        });
      }); 
  });
});
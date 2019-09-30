const request = require('../request');
const db = require('../db');

describe('studios api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('studios'),
      db.dropCollection('films')
    ]);
  });

  const studio = {
    name: 'Studio A',
    address: {
      city: 'Portland',
      state: 'OR',
      country: 'US'
    }
  };

  const film = {
    title: 'Film A',
    released: 2019,
    cast: [
      {
        role: 'Hero'
      }
    ]
  };


  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }

  function postFilm(film) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => {
        film.studio = body._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
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
          __v: expect.any(Number),
          name: firstStudio.name,
          address: {
            city: firstStudio.address.city,
            state: firstStudio.address.state,
            country: firstStudio.address.country
          }
        });
      });
  });

  it('deletes a studio', () => {
    return postStudio(studio).then(studio => {
      return request.delete(`/api/studios/${studio._id}`).expect(200);
    });
  });

  it('throws an error if film exists', () => {
    return Promise.all([
      postStudio(studio),
      postFilm(film)
    ])
      .then(() => {
        expect(() => {
          return request.delete(`/api/studios/${studio._id}`).expect(400);
        });
      });
  });
});
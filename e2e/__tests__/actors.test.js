const request = require('../request');
const db = require('../db');

describe('actors api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('actors'),
      db.dropCollection('films')
    ]);
  });

  const actor = {
    name: 'Jonny Karate',
    dob: new Date('January 1 1995'),
    pob: 'Oregon'
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


  function postActor(actor) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
      .then(({ body }) => body);
  }

  function postFilm(film) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
      .then(({ body }) => {
        film.actor = body._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts an actor', () => {
    return postActor(actor).then(actor => {
      expect(actor).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...actor
      });
    });
  });

  it('gets an actor by id', () => {
    return postActor(actor)
      .then(actor => {
        return request.get(`/api/actors/${actor._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(actor);
          });
      });
  });

  it('gets a list of actors', () => {
    const firstActor = {
      name: 'Jonny Karate',
      dob: new Date('January 1 1995'),
      pob: 'Oregon'
    };

    return Promise.all([
      postActor(firstActor),
      postActor({ name: 'second actor' }),
      postActor({ name: 'third actor' })
    ])
      .then(() => {
        return request.get('/api/actors')
          .expect(200);
      })
      .then(({ body }) => {      
        expect(body.length).toBe(3);
        expect(body[0]).toEqual({
          _id: expect.any(String),
          name: 'Jonny Karate',
          dob: '1995-01-01T08:00:00.000Z',
          pob: 'Oregon',
          __v: 0
        });
      });
  });

  it('deletes an actor', () => {
    return postActor(actor).then(actor => {
      return request.delete(`/api/actors/${actor._id}`).expect(200);
    });
  });

  it('throws an error if actor is in film', () => {
    return Promise.all([
      postActor(actor),
      postFilm(film)
    ])
      .then(() => {
        expect(() => {
          return request.delete(`/api/actors/${actor._id}`).expect(400);
        });
      });
  });
});
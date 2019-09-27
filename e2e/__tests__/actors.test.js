const request = require('../request');
const db = require('../db');

describe('actors api', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const actor = {
    name: 'Jonny Karate',
    dob: new Date('January 1 1995'),
    pob: 'Oregon'
  };

  function postActor(actor) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
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
});
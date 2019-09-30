const request = require('../request');
const db = require('../db');

describe('film api', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('reviews'),
      db.dropCollection('reviewers'),
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

  const actor = {
    name: 'Jonny Karate',
    dob: new Date('January 1 1995'),
    pob: 'Oregon'
  };

  const film = {
    title: 'Film A',
    released: 2019,
    cast: [{
      role: 'Hero'
    }]
  };

  function postActor(actor) {
    return request
      .post('/api/actors')
      .send(actor)
      .expect(200)
      .then(({ body }) => body);
  }

  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }

  function postFilm() {
    return Promise.all([
      postActor(actor),
      postStudio(studio)
    ])
      .then(([actor, studio]) => {
        film.studio = studio._id;

        
        console.log(actor, studio);
      });
  }

  it('nothing', async() => {
    await postFilm(film);

  });
});
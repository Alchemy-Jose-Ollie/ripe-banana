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

  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }

  function postFilm() {
    return Promise.all([postActor(actor), postStudio(studio)])
      .then(([actor, studio]) => {
        film.actor = actor._id;
        film.studio = studio._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts a film', () => {
    return postFilm(film).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          title: 'Film A',
          studio: expect.any(String),
          released: 2019,
          cast: [
            {
              _id: expect.any(String),
              role: 'Hero'
            }
          ]
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "cast": Array [
            Object {
              "_id": Any<String>,
              "role": "Hero",
            },
          ],
          "released": 2019,
          "studio": Any<String>,
          "title": "Film A",
        }
      `
      );
    });
  });
});

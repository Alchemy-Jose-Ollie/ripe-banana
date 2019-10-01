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

  it('gets a film by id', () => {
    return postFilm(film).then(savedFilm => {
      return request
        .get(`/api/films/${savedFilm._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              title: 'Film A',
              studio: expect.any(Object),
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
              "studio": Any<Object>,
              "title": "Film A",
            }
          `
          );
        });
    });
  });

  it('gets all films', () => {
    const firstFilm = {
      title: 'Film A',
      released: 2019,
      cast: [
        {
          role: 'Hero'
        }
      ]
    };
    return Promise.all([
      postFilm(firstFilm),
      postFilm({
        title: 'Second Film',
        released: 2019,
        cast: [{ role: 'Hero' }]
      }),
      postFilm({
        title: 'Third Film',
        released: 2019,
        cast: [{ role: 'Hero' }]
      })
    ]).then(() => {
      return request
        .get('/api/films')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(3);
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              title: 'Film A',
              studio: expect.any(Object),
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
              "studio": Any<Object>,
              "title": "Film A",
            }
          `
          );
        });
    });
  });

  it('deletes a film', () => {
    return postFilm(film).then(film => {
      return request.delete(`/api/films/${film._id}`);
    });
  });
});

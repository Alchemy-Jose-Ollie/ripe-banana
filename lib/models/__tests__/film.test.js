const Film = require('../film');
const { ObjectId } = require('mongoose').Types;

describe('Film model', () => {
  it('valid model all properties', () => {
    const data = {
      title: 'Film A',
      studio: new ObjectId(),
      released: 2019,
      cast: [{
        role: 'Hero',
        actor: new ObjectId()
      }]
    };

    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
      cast: [{
        _id: expect.any(Object),
        ...data.cast
      }]
    });
  });

  
});
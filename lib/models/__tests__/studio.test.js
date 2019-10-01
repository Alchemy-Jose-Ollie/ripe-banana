const Studio = require('../studio');

describe('Studio model', () => {
  it('valid model all properties', () => {
    const data = {
      name: 'Studio A',
      address: {
        city: 'Portland',
        state: 'OR',
        country: 'US'
      }
    };

    const studio = new Studio(data);
    const errors = studio.validateSync();
    expect(errors).toBeUndefined();

    const json = studio.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  it('validates required properties', () => {
    const data = {};
    const studio = new Studio(data);
    const { errors } = studio.validateSync();

    expect(errors.name.kind).toBe('required');
  });

});
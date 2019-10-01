const Reviewer = require('../reviewer');

describe('Reviewer model', () => {
  it('valid model all properties', () => {
    const data = {
      name: 'Jose Ojeda',
      company: 'Alchemy'
    };

    const reviewer = new Reviewer(data);
    const errors = reviewer.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewer.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  it('validates required properties', () => {
    const data = {};
    const reviewer = new Reviewer(data);
    const { errors } = reviewer.validateSync();

    expect(errors.name.kind).toBe('required');
    expect(errors.company.kind).toBe('required');
  });

});
const Review = require('../review');
const { ObjectId } = require('mongoose').Types;

describe('Review model', () => {
  it('valid model all properties', () => {
    const data = {
      rating: 4,
      reviewer: new ObjectId(),
      review: 'This movie was kind of amazing',
      film: new ObjectId(),
    };

    const review = new Review(data);
    const errors = review.validateSync();
    expect(errors).toBeUndefined();

    const json = review.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  it('validates required properties', () => {
    const data = {};
    const review = new Review(data);
    const { errors } = review.validateSync();

    expect(errors.rating.kind).toBe('required');
    expect(errors.review.kind).toBe('required');
  });

  it('enforces max of 5 for rating', () => {
    const data = {
      rating: 100
    };

    const review = new Review(data);
    const { errors } = review.validateSync();
    expect(errors.rating.kind).toBe('max');
  });

  it('enforces min of 1 for rating', () => {
    const data = {
      rating: -100
    };

    const review = new Review(data);
    const { errors } = review.validateSync();
    expect(errors.rating.kind).toBe('min');
  });

  it('enforces char max for review', () => {
    const data = {
      review: 'lorem impsum, lorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsum lorem impsum, lorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsumlorem impsum lorem impsum'
    };

    const review = new Review(data);
    const { errors } = review.validateSync();
    expect(errors.review.kind).toBe('maxlength');
  });
});
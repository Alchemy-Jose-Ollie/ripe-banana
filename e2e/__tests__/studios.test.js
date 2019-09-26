const request = require('../request');
const db = require('../db');

describe('studios api', () => {
    beforeEach(() => {
      return db.dropCollection('studios');
    });
});
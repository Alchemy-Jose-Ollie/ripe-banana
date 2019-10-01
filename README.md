# LAB 09

## Ripe Banana

### Author: Jose Ojeda, Ollie Comet

### Links and Resources
* [submission PR](http://xyz.com)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) (when applicable)


#### Documentation
* [api docs](http://xyz.com) (API servers)

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - MONGODB_URI=mongodb://localhost:27017/banana

#### Running the app

**Describe what npm scripts do**
test
    npm run jest -- --coverage
  start
    node server.js

available via `npm run-script`:
  lint
    eslint .
  jest
    jest --runInBand
  test:watch
    npm run jest -- --watchAll
  test:verbose
    npm run test -- --verbose
  start:watch
    nodemon server.js
  
#### Tests
Any additional testing information

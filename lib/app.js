const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

app.use(checkConnection);

// API ROUTES
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');
const films = require('./routes/films');
app.use('/api/studios', studios);
app.use('/api/actors', actors);
app.use('/api/reviewers', reviewers);
app.use('/api/reviews', reviews);
app.use('/api/films', films);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;
module.exports = (app) => {
    const weather = require('../controllers/weather.controller');

    app.post('/weather', weather.create);

    app.get('/weather', weather.findAll);

    app.get('/weather/:location', weather.findOne);

    app.put('/weather/:location', weather.update);

    app.delete('/weather/:location', weather.delete);
}
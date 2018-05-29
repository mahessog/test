const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Weather', WeatherSchema);
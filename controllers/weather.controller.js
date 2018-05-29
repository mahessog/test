const Weather = require('../models/weather.model');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.body)
    if(!req.body.content) {
        return res.status(400).send({
            message: "weather content can not be empty"
        });
    }

    const weather = new Weather({
        title: req.body.title || "Untitled Data", 
        content: req.body.content
    });

    weather.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the weather."
        });
    });
};

exports.findAll = (req, res) => {
    Weather.find()
    .then(weather => {
        res.send(weather);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving weather."
        });
    });
};


exports.findOne = (req, res) => {
    Weather.findById(req.params.location)
    .then(weather => {
        if(!weather) {
            return res.status(404).send({
                message: "weather not found with location " + req.params.location
            });            
        }
        res.send(weather);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with location " + req.params.location
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with location " + req.params.location
        });
    });
};


exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
  

    Weather.findByIdAndUpdate(req.params.location, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(weather => {
        if(!weather) {
            return res.status(404).send({
                message: "weather not found with location " + req.params.location
            });
        }
        console.log(req.body)
        res.send(weather);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "weather not found with location " + req.params.location
            });                
        }
        return res.status(500).send({
            message: "Error updating weather with location " + req.params.location
        });
    });
};


exports.delete = (req, res) => {
    Weather.findByIdAndRemove(req.params.location)
    .then(weather => {
        if(!weather) {
            return res.status(404).send({
                message: "Weather not found with location " + req.params.location
            });
        }
        res.send({message: "Weather deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Weather not found with location " + req.params.location
            });                
        }
        return res.status(500).send({
            message: "Could not delete Weather with location " + req.params.location
        });
    });
};
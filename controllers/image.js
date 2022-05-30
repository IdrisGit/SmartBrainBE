const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '194cff41b4844a57a5177c42a1a3654b'
});
  

const handleApiCall = (res, req) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("API Error"))
}

const handleImage = (req, res, db) => {
        const {id} = req.body;
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json(err));
};

module.exports = {
    handleImage,
    handleApiCall
}


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/metronome', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

let tempoSchema = mongoose.Schema({
  piece: String,
  tempo: Number
});

let Tempo = mongoose.model('Tempo', tempoSchema);

let save = (data) => {
  console.log('this is the data in the db.save: ', data);
  Tempo.create(data);
};

let getLast = (callback) => {
  Tempo.findOne().sort({_id: -1}).exec(callback);
};

module.exports.save = save;
module.exports.getLast = getLast;
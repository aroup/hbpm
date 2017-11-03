var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/songs', (req, res) => {
    const details = { played: false };
    db.collection('songs').findOne(details, (err, song) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(song);
      }
    });
  });

  app.post('/songs', (req, res) => {
    console.log(req.body);
    const song = {
      youtube_link: req.body.text,
      user: req.body.user_name,
      played: false,
      created_at: Date.now()
    };
    db.collection('songs').insert(song, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send('The song is added into the queue :) ');
      }
    });
  });

  app.post('/songs/:id', (req, res) => {
    const songId = ObjectID(req.params.id);
    const details = { _id: songId };
    db.collection('songs').update(details, { $set: { played: true } }, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        console.log(res);
        res.send('valo');
      }
    });
  });
};

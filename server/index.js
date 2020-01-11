const express = require('express');
const app = express();
const port = 4000;
const db = require('../database/index.js');
const dbs = require('../database/sequelize.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/get', (req, res) => {
  console.log('We received the get request');
  return dbs.Tempo.findOne({order: [ [ 'createdAt', 'DESC' ]]})
    .then((results) => {
      console.log('This is the results of the dbs.Tempo.findOne: ', results);
      res.send(results);
    })
  // db.getLast((err, results)=>{
  //   if (err){
  //     console.log('this is the err from db.getLast: ', err);
  //   }
  //   console.log('this is the results from db.getLast: ', results);
  //   res.send(results);
  // })

});

app.post('/', (req,res) => {
  console.log('this is req.body: ', req.body);
  return dbs.Tempo.create({piece: req.body.piece, tempo: req.body.tempo})
  .then(()=>{
    console.log('I think the dbs.Tempo.create worked!');
    res.sendStatus(200);
  })
  .catch((error) =>{
    console.log('This is the error from dbs.Tempo.create :', error);
    res.end();
  })
 //db.save(req.body);
  //res.sendStatus(200);
})

app.listen(port, () =>{console.log(`Server is running on ${port}`)});
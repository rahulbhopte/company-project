const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
const formdata = require('./FormData')
// djCxYmiu1E7VVPew
// const uri='mongodb+srv://rahulbhopte2510:djCxYmiu1E7VVPew@cluster0.chqlqqi.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully', 'mongodb://localhost:27017/mydatabase');
});
app.get('/', async (req, res) => {
    // const testdata = await connection.collection('formdata').find().toArray();
    // console.log("data --->", testdata);
    connection.collection('formdata').find().toArray()
        .then(result => {
            res.status(200).json({
                data: result,
                
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errror: err
            })
        })
})

app.post('/api/formdata', (req, res) => {
    const { name, sex, age,phone,address,govtIdType,govtId,guardian,guardianName,nationality } = req.body;

    const formData = new formdata({
      name,
      sex,
      age,
      phone,
      address,
      govtIdType,
      govtId,
      guardian,
      guardianName,
      nationality
    });
    console.log(formData)
    connection.collection('formdata').insertOne(formData, (err, result) => {
        if (err) {
          res.send({ message: 'An error occurred' });
        } else {
          res.send({ message: 'Form data saved successfully' });
        }
      });
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
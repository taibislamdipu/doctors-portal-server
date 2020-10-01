const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.is4kq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 5000

// database connection
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const doctorPortalCollections = client.db("doctorPortal").collection("appointments");

    console.log("Database connected successfully !!");

    app.post("/setAppointments", (req, res) => {
        const appointment = req.body;
        doctorPortalCollections.insertOne(appointment)
            .then(result => {
                console.log('client side thke paisi', result);
            })
    })

});


app.get('/', (req, res) => {
    res.send('Doctors Portal Server Home Page.')
})

app.listen(port)
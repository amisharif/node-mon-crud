const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { response } = require('express');

const uri = "mongodb+srv://sharifcse:Sharif_17@cluster0.uuffcnr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
    const productCollention = client.db("organicdb").collection("products");
    // perform actions on the collection object

    app.post('/addProduct', (req, res) => {

        const product = req.body;
        productCollention.insertOne(product);
        res.redirect('/');
    })

    app.get('/product/:id', (req, res) => {

        productCollention.find({ _id: ObjectId(req.params.id) })
            .toArray((err, result) => {
                res.send(result[0]);
            })
    })


    app.get('/products', (req, res) => {
        productCollention.find({})
            .toArray((err, document) => {
                res.send(document);
            })


    })


    app.delete('/delete/:id', (req, res) => {
        productCollention.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
                console.log(result);
            })
    })


});




app.listen(3000, () => {
    console.log('port 3000')
})
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5fuqo8h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollection=client.db('CarDealer').collection('users');

        app.post('/users',async(req,res)=>{
            const user=req.body;
            console.log(user);
            const result=await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users',async(req,res)=>{
            const user={}
            const result=await usersCollection.find(user).toArray();
            res.send(result);
            console.log(result);
        })

        // app.get('/jwt', async(req, res)=>{
        //     const email = req.query.email;
        //     const query = { email: email };
        //     const user = await usersCollection.findOne(query);
        //     if (user) {
        //         const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        //         return res.send({ accessToken: token });
        //     }
        //     res.status(403).send({ accessToken: '' })
        // })
        // const jwt = require('jsonwebtoken');

        
        app.get('/categories', async(req, res)=>{
            const query = {}
            const result = await categoriesCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/cars/:id', async(req, res)=>{
            const id = req.query.id;
            console.log(id);
            const query = {category_id: id}
            const result = await carsCollection.find(query).toArray();
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Car Dealer server is running');
})

app.listen(port, () => console.log(`Car Dealer running on ${port}`));

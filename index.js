require("dotenv").config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 4000
const cors = require('cors');

app.use(cors())
app.use(express.json());




const uri = "mongodb+srv://movie-next:wFD5gUhZaE9pCLjN@clustertest.2snhq4q.mongodb.net/?appName=ClusterTest";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

     const db = client.db('movie-next-db')
    const movieCollection = db.collection('movie')
    const commentCollection = db.collection('comment')

     app.get('/movies', async(req,res)=>{

        const result = await movieCollection.find().toArray()
         res.send(result);
     })

      app.get('/movies/:id', async(req,res) =>{
      const {id} = req.params
    //   console.log(id);

      const result = await movieCollection.findOne({_id: new ObjectId(id)})

      res.send({
        success: true,
        result
      })
    })


    app.get("/mycollection", async(req,res)=>{
  
      const email = req.query.email;
      const result = await movieCollection.find({addedBy: email}).toArray()
      res.send(result);
    })


      // add movie 

    app.post('/movies', async(req,res)=>{
      const data = req.body
      // console.log(data);
      const result = await movieCollection.insertOne(data);

      res.send({
        success: true,
        result
      })
    })

    //  cmnt 
     app.get('/comments', async(req,res)=>{

        const result = await commentCollection.find().toArray()
         res.send(result);
     })

      // delete 

    app.delete('/movies/:id', async(req,res)=>{
      const {id} = req.params
      const result = await movieCollection.deleteOne({_id: new ObjectId(id)})

      res.send({
        success: true
      })
    })
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

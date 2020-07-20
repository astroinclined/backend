var express = require('express');
var router = express.Router();
var {uuid} = require('uuidv4');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ismail:Whymami99+@sandbox-u2eog.mongodb.net/messageDB?retryWrites=true&w=majority"
var ObjectID = require('mongodb').ObjectID;

const client = new MongoClient(uri);

async function main(){

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
 
}
}

main().catch(console.error);

let users =[
  {
    id:'1',
    username: 'imourad',
    firstName: 'Ismail',
    lastName: 'mourad'
  }
];

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  try {
    // Connect to the MongoDB cluster
   

    // Make the appropriate DB calls
    var messages = await client.db('messageDB').collection('messages').find().toArray();
   

} catch (e) {
    console.error(e);
}
  res.send(messages);
});

router.get('/:userId', function(req,res, next){
  const foundUser = users.find(user => user.id === req.params.userId)
  res.setHeader('Content-Type', 'application/json')
  res.send(foundUser);
 
});
router.delete('/:clear',async function(req,res,next){
  res.setHeader('Content-Type', 'application/json')
  await client.db('messageDB').collection('messages').remove();
})
{

}
router.post('/', async function(req, res, next) {
  const newUser = req.body;
  newUser.id = uuid();
  //users.push(newUser);

  try{
   
    await client.db('messageDB').collection('messages').insertOne(newUser);
  
  }
  catch(e)
  {
    console.log(e);
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(newUser);
});
router.delete('/', async function(req,res,next){
  res.setHeader('Content-Type', 'application/json');
  const _id = new ObjectID(req.body._id)
  try{
   
    
    await client.db('messageDB').collection('messages').deleteOne({_id:_id}, function(err, obj){
      if (err) throw err;
      console.log(_id);
      console.log("1 docoument deleted");
    });
  
  }
  catch(e)
  {
    console.log(e);
  }

  res.send(_id);
});

module.exports = router;

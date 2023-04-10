const MongoClient = require('mongodb').MongoClient;

const MONGO_URi = process.env.MONGO_URi || 'mongodb+srv://manuelcastro2021:manny@cluster0.awlhand.mongodb.net/?retryWrites=true&w=majority'
// const uri = 'mongodb+srv://abulatovic2016:rZyaVwWPwuOJG9nI@project1.r4tywsz.mongodb.net/?retryWrites=true&w=majority';
//const uri = 'mongodb+srv://manuelcastro2021:manny@cluster0.awlhand.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(MONGO_URi, { useNewUrlParser: true });

client.connect((err) => {
    if (err) {
      console.log('Error connecting to MongoDB:', err);
    } else {
      console.log('Successfully connected to MongoDB');
    }
  });
  
  module.exports = client;
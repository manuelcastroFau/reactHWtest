//studentserver.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { hostname } = require('os');
//const path = require('path')


const cors = require('cors');
app.use(cors());

// Mongo
const client = require('./db.js');
const database = client.db('hw07');
const collection = database.collection('students');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Student Servers assigment API',
      version: '1.0.0',
      description: 'API documentations for assigment'
    },
  },
  apis: ['studentserver.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./client/build'));

app.set("view engine", "ejs");


/**
 * @swagger
 * /:
 *   get:
 *     summary: get basic info about server
 *     description: Show server address and port open, hostname and date
*/
app.get('/info', (req, res) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  res.send(`
  <h1> Manuel Local Server</h1>\
    <h2> StudentServer API<h2>
    <h3>Hostname: <i>${hostname}</i></h3>

    <p>Working in <a href="/:${listener.address().port}"> /:${listener.address().port} </a> </p>
    <p><b>File: </b>${__filename}<p>
    <p><b>Date: </b>${today.toDateString()}</p>
  `);
});


// Add route for home and using a REGEX to dynamic access to different routes 
// app.get('/', (req, res) => {
//   console.log('ruta pedid: ' + req.url)
//   //res.status(200).render("index", { pageTitle: 'home' });
//   //res.status()
// });

// !!! Important we can use several methods to resolve dinyamic routes and avoid code duplication
// Examples:
// const routes= ['/add-Student','/delete-Student', '/list-Students','/update-Student','/display-Student' ]
// app.get('/\/*-Student|\/*-Students/', (req,res)=>{
//app.get(routes, (req,res)=>{
app.get('*-Student*', (req, res) => {
  console.log('route requested: ' + req.url)
  res.status(200).render(`${req.url}`.substring(1), { pageTitle: `${req.url}`.substring(1) });
});


//to check later
const myroutes = ['Home','AddStudent','GetStudent','DeleteStudent','UpdateStudent','ListStudents','SearchGPA','Search']
app.get(myroutes, (req,res) => {
  res.sendFile(path.join(__dirname, 'client/build','index.html'));
})

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add new students
 *     description: Add a new student passing student data.
 *     parameters:
  *     - name: first_name
  *       description: First Name
  *       in: body
  *       required: true
  *       type: string
  *     - name: last_name 
  *       description: lastName
  *       in: body
  *       required: true
  *       type: string
  *     - name: gpa 
  *       description: StudentGPA
  *       in: body
  *       required: true 
  *       type: string
  *     - name: enrolled 
  *       description: enrolled
  *       in: body
  *       required: true
  *       type: Boolean
 *     responses:
 *        200:
 *          description: Success
 *      
*/
app.post('/students', async function (req, res) {

  student = {
    _id: new Date().getTime(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gpa: parseFloat(req.body.gpa),
    enrolled: req.body.enrolled
  };

  // const filter = { last_name: student.last_name };
  //$or: [{ inStock: true }, { name: "Apple Iphone 11" }] 
  const filter = { $and: [{ last_name: student.last_name }, {first_name: student.first_name}] };
  const update = { $setOnInsert: student };
  const options = { upsert: true };

  try {
    const result = await collection.updateOne(filter, update, options);
    console.log('ssaasas', result);
    //console.log(`Object saved to MongoDB with ID: ${result.insertedId}`);
    if (result.matchedCount == 0) {
      res.status(200).send('User added');
    } else {

      res.status(422).send('User already exist');
    }
  }
  catch (err) {
    console.log(err);
  }

});

/**
 * @swagger
 * /students/{record_id}:
 *   get:
 *     summary: Display a single student by record ID
 *     description: Using student id diusplay its data
  *     parameters:
  *     - name: record_id
  *       description: record ID
  *       in: url
  *       required: true
 *     responses:
 *        200:
 *          description: Success
 * @param record_id Student record id   
*/
app.get('/students/:record_id', async function (req, res) {
  console.log('id: ', req.params.record_id);
  const query = { _id: parseInt(req.params.record_id) };
  const options = { sort: { _id: -1 } }
  try {
    const result = await collection.findOne(query, options);
    console.log('API result: ', result);
    if (result != null) {
      res.status(200).send(result);
    }
    else {
      res.status(422).send('ID not match records');
    }
  }
  catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Display all students records
 *     description: Dispaly all students record storage in our DB
 *     responses:
 *        200:
 *          description: Success
 *        204:
 *          description: failure
 *      
*/
app.get('/students', async function (req, res) {
  const query = {}
  const options = { sort: { _id: 1 } }
  try {
    const cursor = collection.find(query, options);

    if (collection.countDocuments() !== 0) {
      studentsList = [];
      await cursor.forEach(function (doc) {
        studentsList.push(doc);
      });
      console.log('API result: ', studentsList);
      res.status(200).send(studentsList);
    }
    else {
      res.status(204).send('Collection is empty');
    }
  }
  catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /students/{record_id}:
 *   put:
 *     summary: Update student data
 *     description: Using student id modify its current data
 *     responses:
 *        200:
 *          description: Success
  *     parameters:
  *     - name: first_name
  *       description: First Name
  *       in: body
  *       required: true
  *       type: string
  *     - name: last_name 
  *       description: lastName
  *       in: body
  *       required: true
  *       type: string
  *     - name: gpa 
  *       description: StudentGPA
  *       in: body
  *       required: true 
  *       type: string
  *     - name: enrolled 
  *       description: enrolled
  *       in: body
  *       required: true
  *       type: Boolean
 *          
 *            
 * @param record_id: Student record id   
 *      
*/
app.put('/students/:record_id', async function (req, res) {
  const id = req.params.record_id
  student = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gpa: parseFloat(req.body.gpa),
    enrolled: req.body.enrolled
  };

  const filter = { _id: parseFloat(id) };
  const update = { $set: student };
  const options = { upsert: false };

  try {
    const result = await collection.updateOne(filter, update, options);
    console.log('API result: ', result);
    if (result.matchedCount == 1) {
      res.status(200).send('User Modified');
    } else {
      res.status(404).send('User not exist');
    }
  }
  catch (err) {
    console.log(err);
  }

}); //end put method




/**
 * @swagger
 * /students/{record_id}:
 *   delete:
 *     summary: Delete student using the record_id
 *     description: Delete student from records filtering by its user id
 *     parameters:
  *     - name: record_id
  *       description: Student ID to delete
  *       in: url
  *       required: true
  *       type: string
 *     responses:
 *        200:
 *          description: Success
 * @param record_id: Student record id   
 *      
*/
app.delete('/students/:record_id', async function (req, res) {
  const query = { _id: parseFloat(req.params.record_id) };

  console.log('Student to delete: ',req.params.record_id)
  try {
    const result = await collection.deleteOne(query);
    console.log('API result: ', result);
    if (result.deletedCount == 1) {
      res.status(200).send('User deleted');
    } else {
      res.status(404).send('No documents matched the query');
    }
  }
  catch (err) {
    console.log(err);
  }

}); //end delete method



/**
* This method takes a query (string) as a param and pass it to mongo 
* to find all the record that matches the query
* @method get /students/:query
* @param {object} req - The request object.
* @param {object} res - The response object.
* @returns {object} The response object containing the status and message of the operation.
* @throws {Error} If an internal server error occurs during the operation.
*/
app.get('/students-search/:qkey/:qvalue', async function (req, res) {
  const mykey = req.params.qkey;
  const value =req.params.qvalue;
  // differents way to query 
  //const value = RegExp(req.params.qvalue, 'i');
  //const myliter = `{"${mykey}": "${value}"}`;
  //const myliter = `{"${mykey}": "${value}"}`;
  //const myfilter = { $text: { $search: }}
  // const myfilter = `{"${mykey}": { "$regex": "/${value}/"}}`;
  //const query = JSON.parse(myfilter);
  const filter =  RegExp(value,'i' );
  
  const query ={ last_name: filter};

  console.log(query);
  const options = { sort: { _id: 1 } }
  try {
    const cursor = collection.find(query, options);
    //cursor.leng
    if (cursor.matchedCount !== 0) {
      studentsList = [];

      await cursor.forEach(function (doc) {
        studentsList.push(doc);
      });
      console.log('API result: ', studentsList);
      res.status(200).send(studentsList);

    }
    else {
      res.status(204).send('Collection is empty');
    }
  }
  catch (err) {
    console.log(err);
  }
});


/**
* This method search for a  gpa values using operator 
* to find all the record that matches withthe query
* @method get /students/:query
* @param {object} req - The request object.
* @param {object} res - The response object.
* @returns {object} The response object containing the status and message of the operation.
* @throws {Error} If an internal server error occurs during the operation.
*/
app.get('/gpa-search/:qvalue', async function (req, res) {
  const oper = req.query.operation;
  const value = parseFloat( req.params.qvalue);
  
  const filter = value;
  
  let query;
  console.log('oper here is: ',oper, typeof(oper))
  if(oper === "gt" ){
     query ={ gpa: {$gt: filter}};
  } else if(oper ==="lt") {
     query ={ gpa: {$lt: filter}};
  } else {
    query ={ gpa: {$eq: filter}};
  }

  console.log('filter',filter);
  console.log(query);
  const options = { sort: { _id: 1 } }
  try {
    const cursor = collection.find(query, options);
    //cursor.leng
    if (cursor.matchedCount !== 0) {
      studentsList = [];

      await cursor.forEach(function (doc) {
        studentsList.push(doc);
      });
      console.log('API result: ', studentsList);
      res.status(200).send(studentsList);

    }
    else {
      res.status(204).send('Collection is empty');
    }
  }
  catch (err) {
    console.log(err);
  }
});


app.get('/magic-search/:qvalue', async function (req, res) {
  //const regex = RegExp()
  const mykey = req.params.qkey;
  const value =req.params.qvalue;
  //const value = RegExp(req.params.qvalue, 'i');
  const myfilter = `{"${mykey}": "${value}"}`;
  // const myliter = `{"${mykey}": "${value}"}`;
  //const myfilter = { $text: { $search: value }}
  const query = JSON.parse(myfilter);
  // const ind="{'$**':'text'}"
  // collection.createIndex();
  const index = collection.createIndex({"$**":"text"});
  //index.
  //console.log(query);
  console.log(myfilter);

  //index.$search = ""
  const options = { sort: { _id: 1 } }
  try {
    const cursor = collection.find({$text: {$search: `${value}`}} )
    //cursor.leng
    if (cursor.matchedCount !== 0) {
      studentsList = [];

      await cursor.forEach(function (doc) {
        studentsList.push(doc);
      });
      console.log('API result: ', studentsList);
      res.status(200).send(studentsList);

    }
    else {
      res.status(204).send('Collection is empty');
    }
  }
  catch (err) {
    console.log(err);
  }
});




app.get('/search-name/:fname/:lname', async function (req, res) {
  const fname = req.params.fname;
  const lname = req.params.lname;
  const myliter = `{"first_name": "${fname}", "last_name": "${lname}"}`;
  const query = JSON.parse(myliter);

  console.log(query);
  const options = { Sort: { gpa: -1 } }
  try {
    const cursor =  collection.find(query,{ Sort : {gpa: -1 }});
    if (cursor.matchedCount !== 0) {
      studentsList = [];

      await cursor.forEach(function (doc) {
        studentsList.push(doc);
      });
      console.log('API result: ', studentsList);
      res.status(200).send(studentsList);
    }
    else {
      res.status(204).send('Collection is empty');
    }
  }
  catch (err) {
    console.log(err);
  }
});

port = process.env.PORT || 8080
var listener = app.listen(port); //start the server
console.log('Server is running...');
const express = require('express');
const dotenv = require('dotenv').config();
const fs = require('fs');
const cors = require('cors');

//Get ENV Variables
const PORT = process.env.PORT || 3000;

//App config
const app = express();
app.use(express.json());
app.use(cors());
//Routes

app.get('/', (req, res) => {
  res.json(readDatabase());
});

app.get('/:id', (req, res) => {
  res.json(readDatabase());
});

app.post('/', (req, res) => {
  let data = readDatabase();
  data.push(req.body);
  editDatabase(data);
  res.json(readDatabase());
});

app.post('/:id', (req, res) => {
  let data = readDatabase();
  data.push(req.body);
  editDatabase(data);
  res.json(readDatabase());
});

app.delete('/:id', (req, res) => {
  let data = readDatabase();
  data.splice(req.params.id);
  res.json(editDatabase(data));
});

//Start App
app.listen(PORT, () => {
  console.log('App running at http://localhost:' + PORT);
});

//JSON Interaction Functions
function readDatabase(file) {
  const data = JSON.parse(fs.readFileSync(file || './todos.json'));
  return data;
}

function editDatabase(data) {
  fs.writeFileSync('./todos.json', JSON.stringify(data, null, 2), () => {});
  return readDatabase();
}

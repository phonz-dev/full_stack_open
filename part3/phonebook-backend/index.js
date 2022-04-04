const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Person = require('./models/phonebook');

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.use(cors());

app.use(express.static('build'));

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body);
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`
      <p>
        Phonebook has info for ${persons.length} people
      </p>
      <p>
        ${new Date()}
      </p>
    `)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })


  newPerson.save().then(savedPerson => {
    response.json(savedPerson);
  })

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
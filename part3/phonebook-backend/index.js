const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/info', (request, response) => {
  response.send(
    `<p>
      Phonebook has info for ${persons.length} people
    </p>
    <p>
      ${new Date()}
    </p>`
  );
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

const generateId = () => {
  const max = 1000;
  const id = Math.floor(Math.random() * max);
  return id + 1;
}

app.post('/api/persons', (request, response) => {
  const person = request.body;

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name and number fields must not be empty'
    })
  }

  if (persons.some(p => p.name === person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = generateId();
  persons = persons.concat(person);

  response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
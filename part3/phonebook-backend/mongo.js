const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please add the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://fso_part3:${password}@cluster0.g0jgj.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:');
      persons.forEach(({ name, number }) => {
        console.log(`${name} ${number}`);
      })
      mongoose.connection.close();
    })
} else {
  const newName = process.argv[3];
  const newNumber = process.argv[4];

  const newPerson = new Person({
    name: newName,
    number: newNumber,
  })

  newPerson
    .save()
    .then(({ name, number }) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
}



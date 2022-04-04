const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message);
  })

const numberValidator = numStr => {
  const parts = numStr.split('-');

  if (parts.length !== 2) {
    return false;
  }

  return parts[0].length === 2 || parts[0].length === 3
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: numStr => {
        const parts = numStr.split('-');

        if (parts.length !== 2) {
          return false;
        }

        return parts[0].length === 2 || parts[0].length === 3
      },
      message: ({ value }) => `${value} is not a valid phone number.`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Person', personSchema);
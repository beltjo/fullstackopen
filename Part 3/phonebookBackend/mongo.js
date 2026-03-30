/*
  Use Cases:
    1) Add mode. example usage:
    node mongo.js yourpassword Anna 040-1234556

    This will add a single user and their number to the cluster.

    2) Get mode. example usage:
    node mongo.js yourpassword

    This will print all people in the phonebook.
*/

const connect = (url) => {
  mongoose.set('strictQuery', false)
  mongoose.connect(url, { family: 4 })
  console.log('Connected to ', url)
}


const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('No password given, cannot connect.')
  return
}




const db_password = process.argv[2]
// Got the error : Error: querySrv ECONNREFUSED _mongodb, which seems to be an issue with how dns is resolved on windows. Trying the direct link.
// const uri = `mongodb+srv://beltjorg_db_user:${db_password}@phonebooktest.nszvtel.mongodb.net/?appName=PhonebookTest`
const uri = `mongodb://beltjorg_db_user:${db_password}@ac-tdjerld-shard-00-00.nszvtel.mongodb.net:27017,ac-tdjerld-shard-00-01.nszvtel.mongodb.net:27017,ac-tdjerld-shard-00-02.nszvtel.mongodb.net:27017/?ssl=true&replicaSet=atlas-vvc3b1-shard-0&authSource=admin&appName=PhonebookTest`

if (process.argv.length === 3) {
  // No person included, handle get mode
  connect(uri)

  const PersonSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', PersonSchema)

  console.log('Created Person: ', Person, ' Requesting from server.')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5){
  // Person included, add mode
  connect(uri)

  const PersonSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', PersonSchema)

  const newPerson = Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  console.log('Created ', newPerson, ' Attempting to save...')
  newPerson.save().then(result => {
    console.log('Person saved:', result)
    mongoose.connection.close()
  })

} else if (process.argv.length === 4) {
  // Error state.
  console.log('Not enough information to add a new person. Exiting.')
  return
} else {
  console.log(process.argv)
  console.log('Too many paramaters given.  Exiting.')
}
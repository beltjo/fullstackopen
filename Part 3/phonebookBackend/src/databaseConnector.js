const mongooseDB = require('./mongoDBConnection')

module.exports = class database {
  constructor() {
    this.connection = new mongooseDB()
  }

  updatePerson = async (person) => {
    return await this.connection.update(person).then(result => {
      return result
    })
  }


  getPeople = async () => {
    return await this.connection.getAll().then(result => result )
  }

  deletePerson = async (id) => {
    return await this.connection.deleteElement(id).then(result => {
      console.log('Casting ', result)
      return result
    })
  }

  getPerson = async (id) => {
    return await this.connection.getPerson(id).then(result => {
      return { ...result._doc, 'id': result._id }
    })
  }

  addPerson = async (person) => {
    console.log('Calling addPerson', person)
    return await this.connection.addPerson(person).then(result => result)
  }

}
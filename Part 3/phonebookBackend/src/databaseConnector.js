const { connection } = require("mongoose")
const mongooseDB = require("./mongoDBConnection")

module.exports = class database {
    constructor() {
        this.connection = new mongooseDB()
    }

    getPeople = () => {
        return this.connection.getAll().then(result => result)
    }

    deletePerson = ({id}) => {
        return mongoDBConnection.deleteElement(id)
    }

    addPerson = ({person}) => {
        return mongoDBConnection.addPerson(person)
    }

}
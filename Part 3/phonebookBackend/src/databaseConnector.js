const { connection } = require("mongoose")
const mongooseDB = require("./mongoDBConnection")

module.exports = class database {
    constructor() {
        this.connection = new mongooseDB()
    }

    getPeople = async () => {
        return await this.connection.getAll().then(result => result)
    }

    deletePerson = async (id) => {
        return await this.connection.deleteElement(id)
    }

    addPerson = async (person) => {
        console.log("Calling addPerson", person)
        return await this.connection.addPerson(person).then(result => result)
    }

}
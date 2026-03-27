const { connection } = require("mongoose")
const mongooseDB = require("./mongoDBConnection")

module.exports = class database {
    constructor() {
        this.connection = new mongooseDB()
    }

    updatePerson = async (person, next) => {
        return await this.connection.update(person, next).then(result => {
            return {...result._doc, "id": result._id}
        })
    }


    getPeople = async () => {
        return await this.connection.getAll().then(result => {
            
            return result.map(element => {
                return {
                    ...element._doc,
                    "id": element._id
                }
            })
        
        })
    }

    deletePerson = async (id) => {
        return await this.connection.deleteElement(id).then(result => {
            console.log("Casting ", result)
            return {...result._doc, "id": result._id}
        })
    }

    getPerson = async (id) => {
        return await this.connection.getPerson(id).then(result => {
            return {...result._doc, "id": result._id}
        })
    }

    addPerson = async (person, next) => {
        console.log("Calling addPerson", person)
        return await this.connection.addPerson(person, next).then(result => result)
    }

}
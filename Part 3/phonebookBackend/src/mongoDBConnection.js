const mongoose = require("mongoose")
require("dotenv").config()


module.exports = class mongooseDB {
    constructor() {
        const PersonSchema = new mongoose.Schema({
            name: {
                type: String,
                minLength: 3,
                required: true
            },
            number: String
        })
        
        try {
            console.log("No model exists, creating")
            this.Person = mongoose.model('Person', PersonSchema)        
        } catch(error) {
            console.log("Model already exists, loading.")
            this.Person = mongoose.model('Person')
        }


        console.log("Created Person: ", this.Person, " for mongoose.")
    }

    connect = async () => {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI, {family: 4})
        console.log("Connected to ", process.env.MONGODB_URI)

    }

    getAll = async () => {
        await this.connect()
        console.log("Requesting all elements.")
        return this.Person.find({}).then(result => {
            console.log("Result: ", result)
            result.forEach(person => {
                console.log("ForEach:", person)
            })
            
            mongoose.connection.close()
            return result
        })
    }

    deleteElement = async (id) => {
        await this.connect()

        const element = await this.Person.findByIdAndDelete(id)
        console.log("Deleted :", element)
        return element
    }


    addPerson = async (person, next) => {
        await this.connect()

        const newPerson = this.Person({
            name: person['name'],
            number: person['number']
        })
        console.log("Created ", newPerson, " Attempting to save...")
        return newPerson.save().then(result => {
            console.log("Person saved", result)
            mongoose.connection.close()
            return result
        })
        .catch(error => next(error))
    }

    getPerson = async (id) => {
        await this.connect()
        return await this.Person.findById(id)
    }

    update = async (newPerson, next) => {
        await this.connect()
        console.log("Updating person with: ", newPerson)
        const person = await this.Person.findById(newPerson['id'])

        person.number = newPerson['number']
        return person.save().then(result => {
            console.log("Person updated", result)
            mongoose.connection.close()
            return result
        })
        .catch(error => next(error))

    }
}

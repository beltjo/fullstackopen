const mongoose = require("mongoose")
require("dotenv").config()


module.exports = class mongooseDB {
    constructor() {
        const PersonSchema = new mongoose.Schema({
            name: String,
            number: String
        })

        this.Person = mongoose.model('Person', PersonSchema)

        console.log("Created Person: ", this.Person, " for mongoose.")
    }

    connect = () => {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB_URI, {family: 4})
        console.log("Connected to ", process.env.MONGODB_URI)
    }

    getAll = () => {
        let People = []
        this.connect()
        console.log("Requesting all elements.")
        return this.Person.find({}).then(result => {
            console.log("Result: ", result)
            result.forEach(person => {
                console.log("ForEach:", person)
            })

            People = result.map(person => {
                console.log("Map", person)
                return person
            })
            mongoose.connection.close()
            return result
        })
    }

    deleteElement = ({id}) => {
        
    }


    addPerson = ({person}) => {

    }
}

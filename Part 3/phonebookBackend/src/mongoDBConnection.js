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
            number: {
                type: String,

                validate: {
                    validator: function(v) {
                        console.log("Testing : ", v)
                        return v.length >= 8 && /\d{2,3}-\d{5,}/.test(v);
                    },
                    message: props => `${props.value} is not a valid phone number!`
                },
                required: [true, "A number is required!"]
            }
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
            return result.map(element => {
                return {
                    ...element._doc,
                    "id": element._id
                }
            })
        })
    }

    deleteElement = async (id) => {
        await this.connect()

        const element = await this.Person.findByIdAndDelete(id)
        console.log("Deleted :", element)
        return {...element._doc, "id": element._id}
    }


    addPerson = async (person) => {
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
    }

    getPerson = async (id) => {
        await this.connect()
        return await this.Person.findById(id)
    }

    update = async (newPerson) => {
        await this.connect()
        console.log("Updating person with: ", newPerson)
        const person = await this.Person.findById(newPerson['id'])

        person.number = newPerson['number']
        return person.save().then(result => {
            console.log("Person updated", result)
            mongoose.connection.close()
            return {...result._doc, "id": result._id}
            
        })
    }
}

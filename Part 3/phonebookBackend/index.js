const express = require("express")
const morgan = require("morgan")
const database = require("./src/databaseConnector")

let myDatabase = new database()

const app = express()

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message, type:'ValidationError'})
    }
    next(error)
}


morgan.token('body', function (req, res) { 
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } 
    return ""
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
}))

app.get("/api/persons", (request, response) => {
    myDatabase.getPeople().then(people => {
        console.log("Completed request for /api/persons, returning", people)
        return response.json(people)
    })
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    
    myDatabase.getPerson(id).then(person => {
        console.log("Found: ", person)

        if(person) {
            return response.json(person)
        } else {
            return response.status(404).send("No person found with the matching id")
        }
    })
})



app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    
    myDatabase.deletePerson(id).then(result => {
        return response.json(result)
    }) 

})

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    const body = request.body 
    console.log("Body:", body)
    const newPerson = {...body, "id": id}

    myDatabase.updatePerson(newPerson).then(person => {

        if(person) {
            return response.json(person)            
        } else {
            return response.status(404).send("No person found with the matching id")
        }
    })
    .catch(error => next(error))
})


app.post("/api/persons", (request, response, next) => {

    const body = request.body 
    console.log("Body:", body)
    const name = body.name
    const number = body.number
    if (name && number) {
        //Assuming exact match rather than allowing different cases.
            myDatabase.getPeople().then(async people => {
            console.log("Found ", people, " checking for duplicates")
            const duplicateName = people.find((person) => person.name === name)

            if (duplicateName) {
                return response.status(400).send(`${name} already has a record.`)
            }

            const person = {
                "name": name,
                "number": number            
            }
            console.log("Adding ", person)
            const newPerson = await myDatabase.addPerson(person).catch(error => next(error))
            console.log("Added", newPerson)

            return response.status(200).json(newPerson)
        })

    } else {
        return response.status(400).send("Missing name and/or number for person.")
    }


})


app.get("/info", (request, response) => {
    const timestamp = new Date(Date.now())

    myDatabase.getPeople().then( people => { 
        const phoneInfo = `<p>Phonebook has info for ${people.length} people</p>`
        const timestampString = `<p>${timestamp}</p>`

        return response.end(`${phoneInfo}${timestampString}`)

    })

})

app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
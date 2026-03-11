const express = require("express")
const morgan = require("morgan")

let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()

morgan.token('body', function (req, res) { 
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } 
    return ""
})

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

app.get("/", (request, response) => {
    response.end('<h1>Hello, click on a link to test a connection</h1><ul><li><a href="../api/persons">See all people</a></li><li><a href="../info">See info</a></li><ul>')
})


app.get("/api/persons", (request, response) => {
    response.json(people)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    
    const person = people.find((person) => person.id === id)

    if(person) {
        return response.json(person)
    } else {
        return response.status(404).send("No person found with the matching id")
    }

})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    
    people = people.filter((person) => person.id !== id)

    return response.status(204).end()

})


app.post("/api/persons", (request, response) => {

    const body = request.body 
    console.log("Body:", body)
    const name = body.person
    const number = body.number
    const id = Math.floor(Math.random() * 10000)
    if (name && number) {
        //Assuming exact match rather than allowing different cases.
        const duplicateName = people.find((person) => person.name === name)

        if (duplicateName) {
            return response.status(400).send(`${name} already has a record.`)
        }

        const person = {
            "id": id,
            "name": name,
            "number": number            
        }
        people = [...people, person]
        return response.status(200).json(person)
    } else {
        return response.status(400).send("Missing name and/or number for person.")
    }


})


app.get("/info", (request, response) => {
    const timestamp = new Date(Date.now())
    const phoneInfo = `<p>Phonebook has info for ${people.length} people</p>`
    const timestampString = `<p>${timestamp}</p>`

    response.end(`${phoneInfo}${timestampString}`)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const newNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const newPhoneNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  const onNewPersonFormSubmit = (event) => {
    event.preventDefault()
    console.log("Adding person's name ", newName)


    if ( persons.findIndex((person) => person.name === newName )  > -1) {
      window.alert(`${newName} is already added to the phonebook.`)
    }
    else {
      setPersons(persons.concat({ name: newName, phoneNumber: newPhoneNumber}))
      setNewName("")
      setNewPhoneNumber("")
    }    
  }
  let phonebook
  if (filter.length > 0) {
    phonebook = persons.filter((person) => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    } )
  } else {
    phonebook = persons
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filter} onChange={filterChange}></input>
      </div>

      <h2>add a new person</h2>
      <form onSubmit={onNewPersonFormSubmit}>
        <div>
          name: <input value={newName} onChange={newNameChange}/>
        </div>
        <div>
          phone number: <input value={newPhoneNumber} onChange={newPhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {phonebook.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.phoneNumber}</td></tr>) }
        </tbody>
      </table>
    </div>
  )
}

export default App
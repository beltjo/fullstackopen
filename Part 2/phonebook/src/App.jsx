import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, filterChange}) => {
  return (
      <div>
        filter shown with <input value={filter} onChange={filterChange}></input>
      </div>
  )
} 

const NewPersonSubmittion = ({newName, newNameChange, newPhoneNumber, newPhoneNumberChange, onNewPersonFormSubmit}) => {
  return (
    <>
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
    </>
  )
}

const Phonebook = ({phonebook}) => {
  return (      
        <table>
          <tbody>
            {phonebook.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>) }
          </tbody>
        </table>
      )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    console.log("Starting effect")
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log(response)
        setPersons(response.data)
      })
  }, [])

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
      setPersons(persons.concat({ name: newName, number: newPhoneNumber, id:persons.length + 1}))
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
      <Filter filter={filter} filterChange={filterChange} />
      <NewPersonSubmittion newName={newName} newNameChange={newNameChange} newPhoneNumber={newPhoneNumber} newPhoneNumberChange={newPhoneNumberChange} onNewPersonFormSubmit={onNewPersonFormSubmit}/>
      <h2>Numbers</h2>
      <Phonebook phonebook={phonebook} />
    </div>
  )
}

export default App
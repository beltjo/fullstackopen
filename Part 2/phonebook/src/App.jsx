import { useState, useEffect } from 'react'
import phoneService from './services/phoneService'

const Notification = ({message, setAlertMessage}) => {
  if(message === null) {
    return null
  }

  setTimeout(() => {
    setAlertMessage(null)
  }, 5000)

  return ( <div className={message.type}>
    <h3>{message.message}</h3>
  </div>)
}

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

const Phonebook = ({phonebook, onDelete}) => {
  return (      
        <table>
          <tbody>
            {phonebook.map((person) => <tr key={person.id}><td>{person.name}</td><td>{person.number}</td><td><button onClick={() => {onDelete(person.id)}}>Delete</button></td></tr>) }
          </tbody>
        </table>
      )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  
  useEffect(() => {
    console.log("Starting effect")

    phoneService
      .getNumbers()
      .then((data) => {
        console.log(data)
        setPersons(data)
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
    //TODO: Would want the server to determine id or a different way to generate unique ids as this can create duplicate keys when deleting then adding entries.
    let newNumber = { name: newName, number: newPhoneNumber, id:persons.length + 1}

    const newPerson = persons.find((person) => person.name === newName ) 
    if (newPerson) {
      if (window.confirm(`${newName} is already in the the phonebook, would you like to update their number?`)) {
        console.log("Confirmed replacement.")
        phoneService
          .putNumber(newPerson.id, newNumber)
          .then((data) => {
            setPersons(persons.map((person) => person.id === data.id ? data : person))
            setNewName("")
            setNewPhoneNumber("")
            setAlertMessage({message:`Updated ${data.name}`, type:"alert"})
          })
          .catch((error) => {
            console.error("Ran into error while modifying user", error)  
            setAlertMessage({message:`${newPerson.name}'s information has already been removed.`, type:"error"})
            setPersons(persons.filter((person) => person.id !== newPerson.id))
          })
      }
    }
    else {

      phoneService.postNumber(newNumber).then(data => {
          console.log(data)
          setPersons(persons.concat(data))
          setNewName("")
          setNewPhoneNumber("")
          setAlertMessage({message:`Added ${data.name}`, type:"alert"})
        })

    }    
  }

  const deleteEntry = (id) => {
    console.log(id)
    const person = persons.find((person) => person.id === id)
    console.log("Found person", person)
    if (person === undefined) {
      console.log("Error, did not find matching id.")
      return
    }
    
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log("Delete Confirmed")

      phoneService.deleteNumber(person.id)
        .then(data => {
          console.log(data)
          setPersons(persons.filter((person) => person.id !== data.id))
        })
      
    }
    else {
      console.log("Delete rejected.")
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
      <Notification message={alertMessage} setAlertMessage={setAlertMessage} />
      <Filter filter={filter} filterChange={filterChange} />
      <NewPersonSubmittion newName={newName} newNameChange={newNameChange} newPhoneNumber={newPhoneNumber} newPhoneNumberChange={newPhoneNumberChange} onNewPersonFormSubmit={onNewPersonFormSubmit}/>
      <h2>Numbers</h2>
      <Phonebook phonebook={phonebook} onDelete={deleteEntry}/>
    </div>
  )
}

export default App
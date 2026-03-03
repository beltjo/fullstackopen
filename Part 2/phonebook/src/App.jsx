import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const newNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const onNewPersonFormSubmit = (event) => {
    event.preventDefault()
    console.log("Adding person's name ", newName)

    if ( persons.findIndex((person) => person.name === newName )  > -1) {
      window.alert(`${newName} is already added to the phonebook.`)
    }
    else {
      setPersons(persons.concat({ name: newName }))
      setNewName("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onNewPersonFormSubmit}>
        <div>
          name: <input value={newName} onChange={newNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => <tr key={person.name}><td>{person.name}</td></tr>) }
        </tbody>
      </table>
    </div>
  )
}

export default App
import { useState } from 'react'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

//Trying out without an object containing each part, doesn't seem great as this is a lot of variables to track, 
// but with an object we have to know how the object is structured.
const DailyAnecdote = ({votes, anecdotes, selected, voteSelected, selectRandom}) => {
  return (      
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <Button onClick={voteSelected} text="vote"></Button>
      <Button onClick={selectRandom} text="next anecdote"></Button>
    </>
  )
}

const MostVotes = ({anecdotes, votes}) => {

  let max = 0
  let index = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > max) {
      max = votes[i]
      index = i
    }
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[index]}</div>
      <div>has {votes[index]} votes</div>
    </>      
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const voteSelected = () => {
    const voteCopy = [...votes]
    voteCopy[selected] += 1
    setVotes(voteCopy)
  }


  

  return (
    <>      
      <DailyAnecdote votes={votes} anecdotes={anecdotes} selected={selected} voteSelected={voteSelected} selectRandom={selectRandom}/>
      <MostVotes anecdotes={anecdotes} votes={votes}/>
    </>

  )
}

export default App
import { useState } from 'react'

const Button = ({value}) => {
  const increaseCount = () => {
    value.setter(value.count + 1)
  }

  return (
    <button onClick={increaseCount} >{value.title}</button>
  )
}

const Display = ({value}) => {
  return (
    <p> {value.title} {value.count} </p>
  )

}


function App() {
  const [badFeedbackCount, setBadFeedbackCount] = useState(0)
  const [neutralFeedbackCount, setNeutralFeedbackCount] = useState(0)
  const [goodFeedbackCount, setGoodFeedbackCount] = useState(0)
  const bad = {
    title: "bad",
    count: badFeedbackCount,
    setter: setBadFeedbackCount
  }
  const neutral = {
    title: "neutral",
    count: neutralFeedbackCount,
    setter: setNeutralFeedbackCount
  }
  const good = {
    title: "good",
    count: goodFeedbackCount,
    setter: setGoodFeedbackCount
  }


  return (
    <>

      <h1>Give Feedback</h1>

      <Button value={good}></Button>
      <Button value={neutral}></Button>
      <Button value={bad}></Button>

      <h1>Statistics</h1>
      <Display value={good} />
      <Display value={neutral} />
      <Display value={bad} />
    </>
  )
}

export default App

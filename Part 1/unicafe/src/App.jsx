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

const Stats = ({feedback}) => {
  //This isn't quite the functional style, but I'm not sure if it is worth using useState for a total and score value.
  let total = 0
  let score = 0
  let positiveCount = 0
  for (let feedbackType of feedback) {
    total = total + feedbackType.count
    score = score + (feedbackType.score * feedbackType.count)

    if (feedbackType.score === 1) {
      positiveCount = feedbackType.count
    }
  }

  if (total === 0) {
    return (
      <>
        <p>all {total}</p>
        <p>Add feedback to see more statistics</p>
      </>
    )
  }

  const average = score / total
  const positivePercent = (positiveCount / total) * 100
  return (
    <>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercent} %</p>
    </>
  )
}

const Statistics = ({feedback}) => {
  let buttons = []
  let output = []

  for (let feedbackType of feedback) {
    buttons.push(<Button value={feedbackType}></Button>)
    output.push(<Display value={feedbackType}></Display>)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      {buttons}
      <h1>Statistics</h1>
      {output}
      <Stats feedback={feedback} />
    </>
  )
}


function App() {
  const [badFeedbackCount, setBadFeedbackCount] = useState(0)
  const [neutralFeedbackCount, setNeutralFeedbackCount] = useState(0)
  const [goodFeedbackCount, setGoodFeedbackCount] = useState(0)

  const bad = {
    title: "bad",
    count: badFeedbackCount,
    setter: setBadFeedbackCount,
    score: -1
  }
  const neutral = {
    title: "neutral",
    count: neutralFeedbackCount,
    setter: setNeutralFeedbackCount,
    score: 0
  }
  const good = {
    title: "good",
    count: goodFeedbackCount,
    setter: setGoodFeedbackCount,
    score: 1
  }

  const all = [good, neutral, bad]

  return (
    <>
      <Statistics feedback={all}/>
    </>
  )
}

export default App

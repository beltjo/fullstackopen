import { useState } from 'react'

const Button = ({value}) => {
  const increaseCount = () => {
    value.setter(value.count + 1)
  }

  return (
    <button onClick={increaseCount} >{value.title}</button>
  )
}

const StatisticLine = ({title, value}) => {
  return (
    <p> {title} {value} </p>
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
        <p>No feedback given</p>
      </>
    )
  }

  const average = score / total
  const positivePercent = (positiveCount / total) * 100

  let feedbackCounts = []

  for (let feedbackType of feedback) {
    feedbackCounts.push(<StatisticLine title={feedbackType.title} value={feedbackType.count}></StatisticLine>)
  }


  return (
    <>
      {feedbackCounts}
      <StatisticLine title="all" value={total}/>
      <StatisticLine title="average" value={average}/>
      <StatisticLine title="positive" value={positivePercent.toString() + " %"}/>
    </>
  )
}

const Statistics = ({feedback}) => {
  let buttons = []

  for (let feedbackType of feedback) {
    buttons.push(<Button value={feedbackType}></Button>)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      {buttons}
      <h1>Statistics</h1>
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

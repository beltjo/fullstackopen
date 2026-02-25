import { useState } from 'react'

import './App.css'

function App() {
  const [badFeedbackCount, setbadFeedbackCount] = useState(0)
  const [neutralFeedbackCount, setNeutralFeedbackCount] = useState(0)
  const [goodFeedbackCount, setGoodFeedbackCount] = useState(0)

  return (
    <>
      <div>
        Components and code will go here
      </div>
    </>
  )
}

export default App

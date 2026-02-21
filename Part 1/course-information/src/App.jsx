const Header = (props) => {
  
  return (
    <h1>{props.course}</h1>
  )
}



const Content = (props) => {
  //TODO: Should use a loop to create each <p>, but need to understand if I can create a string of html tags for react.
  // Remember, React components need a single parent container, so the empty tag allows that without adding an extra div.
    return (
      <>
        <p>
          {props.parts[0]} {props.exercises[0]}
        </p>
        <p>
          {props.parts[1]} {props.exercises[1]}
        </p>
        <p>
          {props.parts[2]} {props.exercises[2]}
        </p>
      </>
    )


} 

const Total = (props) => {
  let total = 0
  for (const x of props.exercises){
    total += x
  }

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
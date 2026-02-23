const Header = (props) => {
  
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.title} {props.exercise_count}</p>
  )
}

const Content = (props) => {
  //TODO: Should use a loop to create each <p>, but need to understand if I can create a string of html tags for react.
  // Remember, React components need a single parent container, so the empty tag allows that without adding an extra div.
  return (
    <>
      <Part title={props.parts[0].name} exercise_count={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} exercise_count={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} exercise_count={props.parts[2].exercises}/>
    </>
  )


} 

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)

  let total = 0
  for (const x of exercises){
    total += x
  }

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App
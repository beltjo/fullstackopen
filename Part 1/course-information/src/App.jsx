const Header = (props) => {
  
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  //TODO: Should use a loop to create each <p>, but need to understand if I can create a string of html tags for react.
  // Remember, React components need a single parent container, so the empty tag allows that without adding an extra div.
  return (
    <>
      <Part part={props.course.parts[0]}/>
      <Part part={props.course.parts[1]}/>
      <Part part={props.course.parts[2]}/>
    </>
  )


} 

const Total = (props) => {
  const exercises = props.course.parts.map(part => part.exercises)

  let total = 0
  for (const x of exercises){
    total += x
  }

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {


  const course = {
    name:'Half Stack application development',
    parts: [
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
  }
  

  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App
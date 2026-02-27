import Header from "./Header"
import Total  from "./Total"
import Content from "./Content"


const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)          
        }
      />
    </div>
  )

}

export default Course
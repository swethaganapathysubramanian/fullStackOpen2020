import React from 'react'


const Course = ({ courses }) => {

    return (
        <div>
        { courses.map((course)=> (
         <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total parts= {course.parts} />
        </div>
        ))
        }
        </div>
    
    )}

export default Course;

const Header = ({ name }) => {
    return (
        <h2> {name} </h2>
    )

}

const Content = ({ parts }) => {
    console.log({ parts })
    return (
        <div>

            {parts.map(part => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    )

}

const Part = ({ part, exercises, id }) => {
    return (
        <div>
            <p>
                {part} {exercises}
            </p>
        </div>
    )

}

const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <p><strong>
            total of {total} exercises </strong></p>
    )

}
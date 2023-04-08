import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Container } from 'react-bootstrap'

export default function ListStudents () {
  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5678/students')
        setStudents(response.data)
        console.log('this is response:\n', response)
      } catch (error) {
        console.error('Error fetching students:', error)
        setError(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Container className='py-5'>
        <h1 className='display-2 text-success py-2'>Student List</h1>
        {students && students.length > 0
          ? (
          <table className=" table table-striped table-dark my-3 py-5 px-2">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>GPA</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.gpa}</td>
                  <td>{student.enrolled ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
            )
          : (
          <p>No students found</p>
            )}
        {error && <div>{error.message || 'Error fetching students'}</div>}
      </Container>
    </>
  )
}

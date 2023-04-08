import React, { useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

export default function SearchStudent () {
//   const [recordId, setRecordId] = useState('')
  // const [operation, setOperation] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [gpa, setGpa] = useState('')
  // const [enrolled, setEnrolled] = useState(true)
  const [students, setStudents] = useState([])

  const [message, setMessage] = useState('')

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // gpa-search/:qvalue
      const response = await axios.get(`http://localhost:5678/magic-search/${gpa}`, {

      }
      )
      setStudents(response.data)
      console.log('this is response:\n', response)
    } catch (error) {
      console.error('Error in the search:', error)
      setError(error)
      setMessage('There was an error during the search.')
    }
  }

  return (
    <>
      <Container className='py-5'>
        <h1 className='display-1 text-success'>Global Searcher</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="gpa">Select your desired operator:</label>
          <select
            id="gpa"
            name="gpa"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="gt">Greater than</option>
            <option value="lt">Less than</option>
            <option value="eq">Equal</option>
          </select>
          <br /> */}

          <label htmlFor="gpa" className='px-3 py-3 fs-2 text-dark'>Query Value:</label>
          <input
            type="text"
            id="gpa"
            name="gpa"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
          <br />

          <input type="submit" className='btn btn-success btn-lg my-3' value="Search" />
        </form>
        {message && <div>{message}</div>}
        {students && students.length > 0
          ? (
          <table className="student-table table table-dark py-5">
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
};

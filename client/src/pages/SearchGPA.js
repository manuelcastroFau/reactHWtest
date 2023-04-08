import React, { useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SearchGPA () {
//   const [recordId, setRecordId] = useState('')
  const [operation, setOperation] = useState('')
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

      const response = await axios.get(`http://localhost:5678/gpa-search/${gpa}`, {
        params: { operation }
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
        <h1 className='display-1 text-success'>GPA Searcher</h1>
        <form onSubmit={handleSubmit}>
        <Row >
        <Col><label htmlFor="gpa" className='px-3 py-3 fs-2 text-dark'>Select your desired operator:</label>
          <Form.Select
            id="gpa"
            name="gpa"
            className='custom-select'
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="gt">Greater than</option>
            <option value="lt">Less than</option>
            <option value="eq">Equal</option>
          </Form.Select>
          <br /></Col>
        <Col>
        <label className='px-3 py-3 fs-2 text-dark' htmlFor="gpa">Gpa Value:</label>
          <input
            type="text"
            id="gpa"
            className='form-control '
            name="gpa"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
          <br /></Col>
      </Row>

          <input className='btn btn-success btn-lg my-3' type="submit" value="Search" />
        </form>
        {message && <div>{message}</div>}
        {students && students.length > 0
          ? (
          <table className="student-table student-table table table-dark my-3 py-5 px-2">
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

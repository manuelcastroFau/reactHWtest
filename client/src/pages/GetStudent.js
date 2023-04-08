import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { Container } from 'react-bootstrap'

export default function GetStudent () {
  const [studentId, setStudentId] = useState('')
  const [studentData, setStudentData] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`/students/${studentId}`)
      console.log(response.data)

      // Update studentData state and clear the error state
      setStudentData(response.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching student data:', error)
      // Update error state and clear the studentData state
      setError(error)
      setStudentData(null)
    }
  }

  return (
    <>
      <Container className='py-5'>
        <h1 className='display-1 text-success'>Get Student Data</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId" className='px-3 py-3 fs-2 text-dark'>Student ID:</label>
          <div className='col-xs-4'></div>
          <input
            type="text"
            id="studentId"
            className='form-control '
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <br />
          <input className='btn btn-success btn-lg my-3' type="submit" value="Submit" />
        </form>

        {studentData && (
          <table className=" table table-striped table-dark my-3 py-5 px-2">
            <thead style={{ backgroundColor: '#819CEE' }}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>GPA</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{studentData.first_name}</td>
                <td>{studentData.last_name}</td>
                <td>{studentData.gpa}</td>
                <td>{studentData.enrolled ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        )}
        {error && <div>{error.message || 'Error fetching student data'}</div>}
      </Container>
    </>
  )
}

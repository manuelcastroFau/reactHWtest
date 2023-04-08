import React, { useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'

export default function DeleteStudent () {
  const [studentId, setStudentId] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.delete(`http://localhost:5678/students/${studentId}`)
      // Update successMessage state and clear the error state
      setSuccessMessage('Student has been deleted successfully')
      setError(null)
    } catch (error) {
      console.error('Error deleting student:', error)
      // Update error state and clear the successMessage state
      setError(error)
      setSuccessMessage('')
    }
  }

  return (
    <>
      <Container className='py-5'>
        <h1 className='display-1 text-success'>Delete Student</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId" className='px-3 py-3 fs-2 text-dark'>Student ID:</label>
          <input
            type="text"
            id="studentId"
            className='form-control '
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <br />
          <input type="submit" className='btn btn-success btn-lg my-3' value="Submit" />
        </form>

        {successMessage && <div>{successMessage}</div>}
        {error && <div>{error.message || 'Error deleting student'}</div>}
      </Container>
    </>
  )
}

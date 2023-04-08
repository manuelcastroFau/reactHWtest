/* eslint-disable camelcase */
import React, { useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default function AddStudent () {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [gpa, setGpa] = useState('')
  const [enrolled, setEnrolled] = useState(true)
  const [response, setResponse] = useState('')

  const [error, setError] = useState('')
  // const [loading, setLoading] = useState('')

  // function clearInputs () {
  //   document.getElementById('first_name').value = ''
  //   document.getElementById('last_name').value = ''
  //   document.getElementById('gpa').value = ''
  //   document.getElementById('enrollment').value = ''
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const studentData = {
      first_name,
      last_name,
      gpa,
      enrolled
    }

    try {
      const response = await axios.post('http://localhost:5678/students', studentData)
      console.log(response.data)
      setResponse(response.data)
      setError(null)

      // Clear the form fields after successful submission
      setFirstName('')
      setLastName('')
      setGpa('')
      setEnrolled('yes')
    } catch (error) {
      console.error('Error submitting form:', error)
      setFirstName('')
      setLastName('')
      setGpa('')
      setEnrolled('yes')
      setError(error)
      setResponse(null)
    }
  }

  return (
    <>
      {/* <div id="mytext"> */}
      <Container className='py-5'>
        <h1 className='display-1 text-success'>Add Students</h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <label htmlFor="first_name" className='px-3 py-3 fs-2 text-dark'>First Name:</label>
              <input
                type="text"
                id="first_name"
                className='form-control '
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
            </Col>
            <Col>
              <label htmlFor="last_name" className='px-3 py-3 fs-2 text-dark'>Last Name:</label>
              <input
                type="text"
                id="last_name"
                className='form-control '
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
            </Col>

          </Row>

          <Row>
            <Col>
              <label htmlFor="gpa" className='px-3 py-3 fs-2 text-dark'>GPA:</label>
              <input
                type="text"
                id="gpa"
                className='form-control '
                name="gpa"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
              />
              <br />
            </Col>

            <Col>
              <label htmlFor="enrolled" className='px-3 py-3 fs-2 text-dark'>Enrolled:</label>
              <Form.Select
                id="enrolled"
                name="enrolled"
                value={enrolled}
                onChange={(e) => setEnrolled(e.target.value)}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
              <br />
            </Col>
          </Row>

          <input type="submit" className='btn btn-success btn-lg my-3' value="Submit" />
          <div id="mydiv"></div>
        </form>
        {response && <div>{response.message || 'Student added successfully'}</div>}
        {error && <div>{error.message || 'Student failed'}</div>}
      </Container>
    </>
  )
}

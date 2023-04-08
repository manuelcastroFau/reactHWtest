import React, { useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, Row } from 'react-bootstrap'

export default function UpdateStudent () {
  const [recordId, setRecordId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gpa, setGpa] = useState('')
  const [enrolled, setEnrolled] = useState(true)

  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`/students/${recordId}`, {
        first_name: firstName,
        last_name: lastName,
        gpa,
        enrolled
      })

      setMessage('Student has been updated successfully.')
    } catch (error) {
      console.error('Error updating student:', error)
      setMessage('There was an error updating the student.')
    }
  }

  return (
    <>
      <Container className='py-5'>
        <h1 className='display-1 text-success text-center'>Update Student</h1>
        <form onSubmit={handleSubmit}>
          <Row className='justify-content-center'>
            <Col md={4} >
              <label htmlFor="record_id" className='px-3 py-3 fs-2 text-dark'>Record ID:</label>
              <input
                type="text"
                id="record_id"
                className='form-control '
                name="record_id"
                value={recordId}
                onChange={(e) => setRecordId(e.target.value)}
              />
              <br />
            </Col>
            <Col md={4}>
              <label htmlFor="first_name" className='px-3 py-3 fs-2 text-dark'>First Name:</label>
              <input
                type="text"
                id="first_name"
                className='form-control '
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={4} >
              <label htmlFor="last_name" className='px-3 py-3 fs-2 text-dark'>Last Name:</label>
              <input
                type="text"
                id="last_name"
                className='form-control '
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              </Col>
            <Col md={4} >
              <label htmlFor="gpa" className='px-3 py-3 fs-2 text-dark'>GPA:</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                className='form-control '
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
              />
              <br />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={4} >
              <label htmlFor="enrolled" className='px-3 py-3 fs-2 text-dark'>Enrolled:</label>
              <Form.Select
                id="enrolled"
                name="enrolled"
                className='form-control '
                value={enrolled}
                onChange={(e) => setEnrolled(e.target.value === 'true')}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
              <br />
            </Col>

            <Col md={4} className='justify-content-center align-items-center pt-5 px-auto'>
              <input type="submit" className='btn btn-success btn-lg my-4 mx-5 ' value="Update" />
            </Col>
          </Row>
        </form>
        {message && <div>{message}</div>}
      </Container>
    </>
  )
};

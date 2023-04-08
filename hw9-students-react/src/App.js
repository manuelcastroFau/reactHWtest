import React from 'react'
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'
import AddStudent from './pages/AddStudent'
import GetStudent from './pages/GetStudent'
import DeleteStudent from './pages/DeleteStudent'
import UpdateStudent from './pages/UpdateStudent'
import ListStudents from './pages/ListStudents'
import SearchGPA from './pages/SearchGPA'
import SearchStudent from './pages/SearchStudent'
import Home from './pages/Home'

function App () {
  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/Home'>Students Server </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav>
              <Nav.Link as={Link} to='/AddStudent'> Add </Nav.Link>
              <Nav.Link as={Link} to='/GetStudent'> View </Nav.Link>
              <Nav.Link as={Link} to='/DeleteStudent'> Delete </Nav.Link>
              <Nav.Link as={Link} to='/UpdateStudent'> Update </Nav.Link>
              <Nav.Link as={Link} to='/ListStudents'> List </Nav.Link>
              {/* <Nav.Link as={Link} to='/AddStudent'> Add </Nav.Link> */}
              <Nav.Link as={Link} to='/SearchGPA'> SearchGPA </Nav.Link>
              <Nav.Link as={Link} to='/Search'> Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
       <Route path='/AddStudent' element={<AddStudent/>} />
       <Route path='/GetStudent' element={<GetStudent/>} />
       <Route path='/DeleteStudent' element={<DeleteStudent/>} />
       <Route path='/UpdateStudent' element={<UpdateStudent/>} />
       <Route path='/ListStudents' element={<ListStudents/>} />
       <Route path='/SearchGPA' element={<SearchGPA/>} />
       <Route path='/Search' element={<SearchStudent/>} />
       <Route path='/Home' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App

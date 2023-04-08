// import logo from './logo.svg';
import './App.css'

import { Routes, Route, Link , BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import Home from './pages/home'
import AddStudent from './pages/addStudent'
import UpdateStudents from './pages/updateStudents'
import ViewStudent from './pages/viewStudent'
// import deleteStudent from './pages/deleteStudent'
import ListStudents from './pages/listStudents'
import DeleteStudent from './pages/deleteStudent'
// import searchByName from './pages/listStudents'



<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossOrigin="anonymous"
/>

// export default App;

function App () {
  return (
    <>

    <BrowserRouter>
      <Container>
        <Navbar bg="primary" variant="dark" expand='md'>
          <Container>
            <Navbar.Brand as={Link} to='/Home'>Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/Home'>Home</Nav.Link>
              <Nav.Link as={Link} to='/AddStudent'>Add</Nav.Link>
              <Nav.Link as={Link} to='/UpdateStudent'>Update</Nav.Link>
              <Nav.Link as={Link} to='/ViewStudent'>View</Nav.Link>
              <Nav.Link as={Link} to='/DeleteStudent'>Delete</Nav.Link>
              <Nav.Link as={Link} to='/ListStudents'>List</Nav.Link>
            </Nav>
            </Navbar.Collapse>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
          </Container>
        </Navbar>
      </Container>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/AddStudent' element={<AddStudent/>}/>
        <Route path='/UpdateStudent' element={<UpdateStudents/>}/>
        <Route path='/DeleteStudent' element={<DeleteStudent/>}/>
        <Route path='/ListStudents' element={<ListStudents/>}/>
        <Route path='/ViewStudent' element={<ViewStudent/>}/>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
function Home () {
  return (
        <Container className='py-5 justify-content-center'>
            <h1 className='display-1 text-success text-center'>
            Welcome to student Registry APP
            </h1>
            <Alert variant={'success'} className='display-4 text-center my-5'>React Version</Alert>
            {/* <h5 className='display-5 text-dark text-center pt-3text-center'>React Version</h5> */}
            <h3 className='display-5 text-primary text-center '>Manuel Castro</h3>
            <Image src="landingpage.png" className="img-fluid" max-width="60%" />
            <div className="d-flex justify-content-center">

            {/* style={max-width: 60%;} */}
            </div>
        </Container>
  )
}

export default Home

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from "react";
import axios from "axios"
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddStudent() {
    let [first_name, setFirstName] = useState('');
    let [last_name, setLastsName] = useState('');
    let [gpa, setGpa] = useState('');
    let [enrollment, setEnrollment] = useState('');
    let [response, setResponse] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    function clearInput() {
        document.getElementById('first_name').value = ''
        document.getElementById('last_name').value = ''
        document.getElementById('gpa').value = ''
        document.getElementById('enrollment').value = ''
    }


    let sendStudent = (e) => {
        e.preventDefault();
        console.log(first_name, last_name, gpa, enrollment);
        setError(null);
    }
    axios.post('/students', {
        first_name: first_name,
        last_name: last_name,
        gpa: gpa,
        enrolled: enrollment
    })
        .then(function (response) {
            setError(false);
            setLoading(false);
            setResponse(response);
            console.log('Front-end response is: ');
            console.dir(response);
            console.log('response.data is: ', response.data);
            clearInput();

        })
        .catch(function () {
            setResponse(error);
            setLoading(false);
            setError(true);
            console.log('Erros is: ', error)
            clearInput();
        })
        .then(() => {
            clearInput();
        })
    return (
        <Container>
            <Row>
                <col>

                </col>

                <Form onSubmit={AddStudent} className="py-5">

                    <Form.Group className="mb-3" id="first_name" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First name" value={first_name}
                            onChange={(e) => { setFirstName(e.target.value) }} />
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" id="last_name" controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last name" value={last_name}
                            onChange={(e) => { setLastsName(e.target.value) }} />
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" id="last_name" controlId="formBasicEmail">
                        <Form.Label>GPA</Form.Label>
                        <Form.Control type="number" placeholder="Enter GPA" value={gpa}
                            onChange={(e) => { setGpa(e.target.value) }} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" id="enrollment" controlId="enrollment">
                        <Form.Label>Enrollment:</Form.Label>
                        <Form.Select aria-label="Default select example" size="sm" value={enrollment}
                            onChange={(e) => { setEnrollment(e.target.value) }}>
                            <option value="1">false</option>
                            <option value="2">true</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {loading ? 'Submitting': 'Add Student'}
                    </Button>
                    {loading && <p>Loading ...</p>}
                    {/* {error && <p className='text'>{response.message}</p>} */}
                </Form>

            </Row>

            {/* <label htmlFor='first_name'>First name:</label>
            <input type='text' /> */}
        </Container>
    )
}

export default AddStudent;
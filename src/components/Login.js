import React from 'react'
import {Form,Button} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Login() {

  return (
    <div className='m-5 ps-5'>
    <h3 className="font-weight-bold p-4 text-dark text-primary mb-5">Login</h3>

    <Form.Group as={Row} className="mb-3 w-50 mx-auto" controlId="formBasicEmail">
        <Form.Label column sm={1} className="d-flex justify-content-end">Email</Form.Label>
        <Col sm={11}>
          <Form.Control type="email" placeholder="Email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 w-50 mx-auto" controlId="formBasicPassword">
        <Form.Label column sm={1} className="d-flex justify-content-end">Password</Form.Label>
        <Col sm={11}>
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
       
      <Button className="mt-4 ms-3" variant="primary" type="submit">
            Submit
      </Button>
</div>

  )
}

export default Login
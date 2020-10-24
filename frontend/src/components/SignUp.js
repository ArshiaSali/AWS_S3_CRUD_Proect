import React, { useState } from 'react';
import UserPool from '../UserPool';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [shows, setShows] = useState(false);


    const onSubmit = event => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err){
                console.error(err);
            }
            else{
                setShow(false);
                setShows(true);
                setPassword('');
                setEmail('');
            }
        });
    };

    return (
        <div>
            <Container>
                <Alert show={show} variant="warning">
                    <Alert.Heading>Sign Up below!</Alert.Heading>
                    </Alert>
                    <br/>
                <Alert variant="success">
                    
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <Form.Group controlId="formBasicEmail">
                                <Col xs={3} md={12} >
                                    <Form.Control type="email" placeholder="Enter email" value={email}
                                        onChange={event => setEmail(event.target.value)} /></Col>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Col xs={3} md={12}><Form.Control type="password" placeholder="Password" value={password}
                                    onChange={event => setPassword(event.target.value)} /></Col>
                            </Form.Group>
                            <Col xs={3} md={5}>
                                <Button variant="info" type="submit">
                                    Sign Up
                            </Button></Col>
                        </Row>
                    </Form>
                   
                </Alert>
                <br/>
                <Alert show={shows} variant="warning">
                    <Alert.Heading>Sigun Up Successful!</Alert.Heading>
                    </Alert>
            </Container>
        </div>
    );
};
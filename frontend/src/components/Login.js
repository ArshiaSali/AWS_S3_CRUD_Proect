import React, { useState, useContext} from 'react';
import { AccountContext} from './Accounts';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from "react-router-dom";

export default () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate } = useContext(AccountContext);


    const onSubmit = event => {
        event.preventDefault();
        console.log(history);
        
        authenticate(email, password).then(
            data => {
                console.log("logged in!",data);
                var user_id=data.accessToken.payload.username;
                console.log(user_id);
                history.push(`/dashboard/${user_id}`);

            }).catch(err =>{
                console.error("Failed to login!", err);
            })
    };

    return (

        <div>
            <Container>
                <Alert variant="success">
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">

                            <Row>
                                <Col md={{ span: 6, offset: 3 }}><Form.Label>Email </Form.Label></Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <Form.Control type="email" placeholder="Enter email" value={email}
                                        onChange={event => setEmail(event.target.value)} /></Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}><Form.Label>Password</Form.Label></Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}><Form.Control type="password" placeholder="Password" value={password}
                                    onChange={event => setPassword(event.target.value)} /></Col>
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col md={{ span: 5, offset: 5 }}>
                                <Button variant="info" type="submit">
                                    Login
                            </Button></Col>
                        </Row>
                    </Form>
                </Alert>

            </Container>
        </div>
    );
};
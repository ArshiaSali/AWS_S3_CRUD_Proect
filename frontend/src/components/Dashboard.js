import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Upload from './Upload';
import List from './List';
import Update from './Update';
import Delete from './Delete';
import Pool from '../UserPool';
import { useHistory } from "react-router-dom";

export default () => {
    let history = useHistory();
    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            history.push("/");
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div>
                    <Button variant="info" onClick={logout}>
                        Logout
                            </Button>
                </div>
                <br />
                <Jumbotron>
                    <h1>File Manager Client</h1>
                    <p>
                        Click the buttons to playaround with your files in s3 bucket!
                </p>
                </Jumbotron>
                <Upload />{'   '}
                <List />{'   '}
                <Update />{'   '}
                <Delete />{'   '}

            </div>

        </div>
    );
};
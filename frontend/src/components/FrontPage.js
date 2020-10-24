import React from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Status from './Status';

export default (props) => {
    return (
        <div>
            <Status />
            <br /><br /><br />
            <Login />
            <br /><br /><br />
            <SignUp />
       </div>
    );
};
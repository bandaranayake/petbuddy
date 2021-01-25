import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import * as ROUTES from '../../constants/routes';

function LoginView() {
    return (
        <div className='app outer-wrapper'>
            <div className="center-container">
                <Form className="bg-light p-5">
                    <h3 className="text-center">Login</h3>
                    <hr className="mb-5" />

                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter your email address" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter your password" />
                    </FormGroup>

                    <FormGroup className="mt-5">
                        <Link className="btn btn-block btn-secondary" to={ROUTES.DASHBOARD}>Login</Link>
                    </FormGroup>

                    <FormGroup className="text-center">
                        <Label><Link to={ROUTES.RESET}>Forgotten Password?</Link></Label>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}

export default LoginView;

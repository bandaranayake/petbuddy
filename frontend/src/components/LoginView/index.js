import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export class LoginView extends Component {
    render() {
        return (
            <div className='app'>
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
                            <Button className="btn-block">Login</Button>
                        </FormGroup>

                        <FormGroup className="text-center">
                            <Label><a href="/reset">Forgotten Password?</a></Label>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginView

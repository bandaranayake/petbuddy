import React, { Component } from 'react'
import { Col, Row, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import Select from 'react-dropdown-select';
import UserAvatar from 'react-user-avatar';

import 'font-awesome/css/font-awesome.min.css';

export class CustomersView extends Component {
    render() {
        return (
            <main className="px-5">
                <Row>
                    <Container className="py-4">
                        <Select
                            placeholder="Search by Name or Email"
                            onChange={(values) => this.onChange(values)}
                        />
                    </Container>
                </Row>
                <Row>
                    <Container className="bg-light p-4">
                        <div className="p-2">
                            <Row>
                                <Col md="2" className="text-center">
                                    <UserAvatar size="128" name="Test User" />
                                    <h5>Test User</h5>
                                </Col>
                                <Col md="10" className="px-4">
                                    <Form>
                                        <FormGroup>
                                            <Label for="email">Account</Label>
                                            <Input type="email" name="email" id="email" placeholder="Account Email Address" />
                                        </FormGroup>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="firstname">First Name</Label>
                                                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Label for="lastname">Last Name</Label>
                                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup>
                                            <Label for="phone">Phone Number</Label>
                                            <Input type="tel" name="phone" id="phone" placeholder="Phone Number" />
                                        </FormGroup>

                                        <FormGroup className="mt-5">
                                            <Button className="btn mr-2">Update Account</Button>
                                            <Button className="btn ml-2">Delete Account</Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Row>
            </main>
        );
    }
}

export default CustomersView

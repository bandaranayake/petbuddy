import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Row, Container, Form, FormGroup, Label, Col, Button, Input } from 'reactstrap'
import { FaPencilAlt, FaBan } from 'react-icons/fa';

export class index extends Component {
    render() {
        return (
            <main className="px-5">
                <Container className="bg-light p-4">
                    <div className="p-2">
                        <Row>
                            <div className="col-md-3 container-md text-center" style={{ 'min-width': '160px', 'max-width': '200px' }}>
                                <img src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className="img-fluid rounded-circle border" alt="Responsive" />
                                <h5>Test User</h5>
                            </div>
                            <div className="col-md-9 container-md">
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

                                    <FormGroup className="mt-3">
                                        <Button className="mr-1 my-1 custom-class">Update Account</Button>
                                        <Button className="my-1 custom-class">Delete Account</Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Row>
                    </div>
                </Container>
                <Container className="py-4">
                    <Row>
                        <Table responsive striped hover bordered>
                            <thead>
                                <tr>
                                    <th width="25%">Name</th>
                                    <th width="20%">Type</th>
                                    <th width="20%">Gender</th>
                                    <th width="20%">Birthday</th>
                                    <th width="15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cooper</td>
                                    <td>Dog</td>
                                    <td>Male</td>
                                    <td>05/12/2018</td>
                                    <td>
                                        <div style={{ textAlign: 'center' }}>
                                            <Link className="btn btn-primary btn-md table-actions-btn">
                                                <FaPencilAlt />
                                            </Link>
                                            <Link className="btn btn-danger btn-md table-actions-btn">
                                                <FaBan />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </main >
        )
    }
}

export default index

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Row, Container, Form, FormGroup, Label, Col, Button, Input, CustomInput } from 'reactstrap'
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
                                    <FormGroup>
                                        <Label for="gender">Gender</Label>
                                        <Input type="select" name="gender" id="gender" placeholder="Gender" >
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="birthday">Birthday</Label>
                                        <Input type="date" name="birthday" id="birthday" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input type="text" name="address" id="address" placeholder="Address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input type="text" name="city" id="city" placeholder="City" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input type="textarea" name="about" id="about" placeholder="About" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Allowed Pets</Label>
                                        <div>
                                            <Row>
                                                <Col md="3">
                                                    <CustomInput type="checkbox" id="petdog" name="petdog" label="Dog" />
                                                </Col>
                                                <Col md="3">
                                                    <CustomInput type="checkbox" id="petcat" name="petcat" label="Cat" />
                                                </Col>
                                                <Col md="3">
                                                    <CustomInput type="checkbox" id="petfish" name="petfish" label="Fish" />
                                                </Col>
                                                <Col md="3">
                                                    <CustomInput type="checkbox" id="petbird" name="petbird" label="Bird" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Preferences</Label>
                                        <div>
                                            <Row>
                                                <Col md="6">
                                                    <CustomInput type="checkbox" id="prefdogs" name="prefdogs" label="Has Dogs" />
                                                </Col>
                                                <Col md="6">
                                                    <CustomInput type="checkbox" id="prefcats" name="prefcats" label="Has Cats" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="6">
                                                    <CustomInput type="checkbox" id="prefkids" name="prefkids" label="Has Kids" />
                                                </Col>
                                            </Row>
                                        </div>
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
                                    <th width="50%">Service Name</th>
                                    <th width="35%">Price</th>
                                    <th width="15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cooper</td>
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

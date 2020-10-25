import React, { Component } from 'react'
import { Row, Container, Form, FormGroup, Label, Col, Button, Input } from 'reactstrap'
import Select from 'react-dropdown-select';
import ReactStars from 'react-stars'

export class index extends Component {
    render() {
        return (
            <main className="px-5">
                <Container className="bg-light p-4">
                    <div className="p-2">
                        <Row>
                            <div className="container-md">
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="startdate">Start Date</Label>
                                                <Input type="date" name="startdate" id="startdate" />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="enddate">End Date</Label>
                                                <Input type="date" name="enddate" id="enddate" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="customer">Customer</Label>
                                                <Select style={{ 'fontSize': 'large' }} placeholder="Search by Username or Email" />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="lastname">Pet Sitter</Label>
                                                <Select style={{ 'fontSize': 'large' }} placeholder="Search by Username or Email" id="lastname" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="status">Status</Label>
                                        <Input type="select" name="status" id="status">
                                            <option>Pending</option>
                                            <option>Cancelled</option>
                                            <option>Approved</option>
                                            <option>Completed</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="createdat">Created At</Label>
                                        <Input type="datetime-local" name="createdat" id="createdat" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Rating
                                        <ReactStars count={5} size={40} color2={'#ffd700'} />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="review">Review</Label>
                                        <Input type="textarea" name="review" id="review" placeholder="Review" />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Button className="mr-1 my-1 custom-class">Update Booking</Button>
                                        <Button className="my-1 custom-class">Delete Booking</Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Row>
                    </div>
                </Container>
            </main >
        )
    }
}

export default index

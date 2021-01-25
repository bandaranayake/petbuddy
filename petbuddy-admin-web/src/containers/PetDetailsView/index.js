import React from 'react';
import { Row, Container, Form, FormGroup, Label, Button, Input } from 'reactstrap';

function PetDetailsView() {
    return (
        <main className="px-5">
            <Container className="bg-light p-4">
                <div className="p-2">
                    <Row>
                        <div className="col-md-3 container-md text-center" style={{ 'min-width': '160px', 'max-width': '200px' }}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvYE2zOJG8DvzYnEN3d5by7PYd2LH9vj9qUA&usqp=CAU" className="img-fluid rounded-circle border" alt="Responsive" />
                            <h5>Test User</h5>
                        </div>
                        <div className="col-md-9 container-md">
                            <Form>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="First Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="pettype">Pet Type</Label>
                                    <Input type="select" name="pettype" id="pettype" placeholder="Pet Type" >
                                        <option>Dog</option>
                                        <option>Cat</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="gender">Gender</Label>
                                    <Input type="select" name="gender" id="gender" placeholder="Gender" >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Not Specified</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="birthday">Birthday</Label>
                                    <Input type="date" name="birthday" id="birthday" />
                                </FormGroup>
                                <FormGroup className="mt-3">
                                    <Button className="mr-1 my-1 custom-class">Update Pet</Button>
                                    <Button className="my-1 custom-class">Delete Pet</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </Row>
                </div>
            </Container>
        </main >
    );
}

export default PetDetailsView;

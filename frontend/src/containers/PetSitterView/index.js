import React, { Component } from 'react'

export class index extends Component {
    render() {
        return (
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

                                <FormGroup className="mt-3 text-center text-lg-left">
                                    <Button className="m-2">Update Account</Button>
                                    <Button className="m-2">Delete Account</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </Row>
                </div>
            </Container>
        )
    }
}

export default index

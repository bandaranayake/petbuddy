import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export class index extends Component {
    render() {
        return (
            <div className="center-container">
                <Form className="bg-light p-5">
                    <h3 className="text-center">Account Settings</h3>
                    <hr className="mb-5" />

                    <FormGroup>
                        <Label for="currpassword">Current Password</Label>
                        <Input type="text" name="currpassword" id="currpassword" placeholder="Enter Current Password" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="newpassword">New Password</Label>
                        <Input type="text" name="newpassword" id="newpassword" placeholder="Enter New Password" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="renewpassword">Re-Enter New Password</Label>
                        <Input type="text" name="renewpassword" id="renewpassword" placeholder="Re-enter New Password" />
                    </FormGroup>

                    <FormGroup className="mt-5">
                        <Button className="btn-block">Proceed</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default index

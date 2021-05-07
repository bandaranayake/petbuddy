import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function SettingsView() {
    return (
        <div className="center-container">
            <Form className="bg-light p-5 mt-sm-5 mt-md-0">
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
    );
}

export default SettingsView;

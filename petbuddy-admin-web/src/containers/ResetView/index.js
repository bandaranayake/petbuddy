import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

function ResetView() {
    return (
        <div className='app outer-wrapper'>
            <div className="center-container">
                <Form className="bg-light px-5 py-4">
                    <h3 className="text-center">Forgot Password</h3>
                    <hr className="mb-5" />
                    <Input type="email" name="email" id="email" placeholder="Enter your Email Address" />
                    <FormGroup className="mt-5">
                        <Button className="btn-block">Reset Password</Button>
                    </FormGroup>
                </Form>
            </div>
        </div >
    );
}

export default ResetView;
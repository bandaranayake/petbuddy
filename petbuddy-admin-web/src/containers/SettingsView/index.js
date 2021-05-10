import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { auth } from '../../lib/firebase';

function SettingsView() {
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const updatePassword = () => {
        if (password.length < 8) {
            setError('Password must be of minimum 8 characters length.');
        }
        else if (cPassword !== password) {
            setError('Passwords does not match.');
        }
        else {
            setError('');
            setIsLoading(true);

            auth.currentUser
                .updatePassword(password)
                .then(() => {
                    setIsLoading(false);
                }).catch(err => {
                    if (err.code === 'auth/requires-recent-login') {
                        setError(err.message);
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                    }
                    setIsLoading(false);
                });
        }
    }

    return (
        <div className="center-container">
            <Form className="bg-light p-5 mt-sm-5 mt-md-0">
                <h3 className="text-center">Account Settings</h3>
                <hr className="mb-5" />
                <FormGroup>
                    <Label for="newpassword">New Password</Label>
                    <Input type="password" name="newpassword" id="newpassword" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="renewpassword">Re-Enter New Password</Label>
                    <Input type="password" name="renewpassword" id="renewpassword" placeholder="Re-enter New Password" onChange={(e) => setCPassword(e.target.value)} />
                </FormGroup>

                <FormGroup className="mt-5">
                    <Button className="btn-block" disabled={isLoading} onClick={() => updatePassword()}>{isLoading ? <Spinner /> : 'Proceed'}</Button>
                    <Label className="w-100 mt-2 text-center text-danger">{error}</Label>
                </FormGroup>
            </Form>
        </div>
    );
}

export default SettingsView;

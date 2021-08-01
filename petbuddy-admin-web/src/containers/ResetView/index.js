import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import * as ROUTES from '../../constants/routes';
import { auth } from '../../lib/firebase';
import { ValidateEmail } from '../../utils/validation';
import { IMAGE_BACKGROUND } from '../../assets/images';

function ResetView() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleReset = () => {
        if (!ValidateEmail(email)) {
            setError('The provided email address is not valid. Please enter a valid email address.');
        }
        else {
            setIsLoading(true);

            auth.sendPasswordResetEmail(email)
                .then(() => {
                    setIsLoading(false);
                    history.push(ROUTES.HOME);
                })
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        setError('There is no user record corresponding to the provided email address.');
                    }
                    else if (error.code === 'auth/invalid-email') {
                        setError('That provided email address is invalid. Please enter a valid email address.');
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                    }
                    setIsLoading(false);
                });
        }
    }

    return (
        <div className='app outer-wrapper' style={{ backgroundImage: "url(" + IMAGE_BACKGROUND + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="center-container">
                <Form className="bg-light px-5 py-4">
                    <h3 className="text-center">Forgot Password</h3>
                    <hr className="mb-5" />
                    <Input type="email" name="email" id="email" placeholder="Enter your Email Address" onChange={(e) => setEmail(e.target.value)} />
                    <FormGroup className="mt-5">
                        <Button className="btn-block" disabled={isLoading} onClick={() => handleReset()}>{isLoading ? <Spinner /> : 'Reset Password'}</Button>
                        <Label className="w-100 mt-2 text-center text-danger">{error}</Label>
                    </FormGroup>
                </Form>
            </div>
        </div >
    );
}

export default ResetView;
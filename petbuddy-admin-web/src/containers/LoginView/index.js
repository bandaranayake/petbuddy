import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import * as ROUTES from '../../constants/routes';
import { auth } from '../../lib/firebase';
import { ValidateEmail } from '../../utils/validation';
import { IMAGE_BACKGROUND } from '../../assets/images';

function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (!ValidateEmail(email)) {
            setError('The provided email address is not valid. Please enter a valid email address.');
        }
        else if (password.length < 1) {
            setError('The password field cannot be empty.');
        }
        else {
            setIsLoading(true);

            auth.signInWithEmailAndPassword(email, password)
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        setError('The provided email address is not valid. Please enter a valid email address.');
                    }
                    else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                        setError('You have entered an invalid email address or password.');
                    }
                    else if (error.code === 'auth/too-many-requests') {
                        setError('We have blocked all requests from this device due to unusual activity. Try again later.');
                    }
                    else if (error.code === 'auth/user-disabled') {
                        setError('Your account has been disabled.');
                    }
                    else {
                        setError('Something went wrong. Please try again later.');
                    }
                    setIsLoading(false);
                })
        }
    }

    return (
        <div className='app outer-wrapper' style={{ backgroundImage: "url(" + IMAGE_BACKGROUND + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="center-container">
                <Form className="bg-light p-5">
                    <h3 className="text-center">Login</h3>
                    <hr className="mb-5" />

                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mt-5">
                        <Button className="btn btn-block btn-secondary" disabled={isLoading} onClick={() => handleLogin()}>{isLoading ? <Spinner /> : 'Login'}</Button>
                        <Label className="w-100 mt-2 text-center text-danger">{error}</Label>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <Label><Link to={ROUTES.RESET}>Forgotten Password?</Link></Label>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}

export default LoginView;

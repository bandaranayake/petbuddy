import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export class ErrorPage extends Component {
    render() {
        return (
            <div className='app outer-wrapper'>
                <div className="center-container">
                    <div className="text-center m-auto">
                        <h1 className="text-primary display-1">404</h1>
                        <h2 className="offset-md text-center mb-5">We couldn't find the page <br /> you are looking for (x_x)</h2>
                        <Link className="btn btn-primary" to={ROUTES.HOME}>Back to Home</Link>
                    </div>
                </div >
            </div >
        );
    }
}

export default ErrorPage

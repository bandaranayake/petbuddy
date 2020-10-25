import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className="p-3" color="dark" dark expand="md">
                    <NavbarBrand href="/" className="ml-3">Pet Buddy Dashboard</NavbarBrand>
                    <NavbarToggler onClick={() => this.toggle()} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" pills navbar>
                            <NavItem>
                                <NavLink href={ROUTES.DASHBOARD} className="ml-3 text-uppercase">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={ROUTES.CUSTOMERS} className="ml-3 text-uppercase">Customers</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={ROUTES.PETSITTERS} className="ml-3 text-uppercase">Pet Sitters</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={ROUTES.SERVICES} className="ml-3 text-uppercase">Services</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={ROUTES.BOOKINGS} className="ml-3 text-uppercase">Bookings</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={ROUTES.SETTINGS} className="ml-3 text-uppercase">Account Settings</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        );
    }
}

export default Navigation;
import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { auth } from '../../lib/firebase';
import * as ROUTES from '../../constants/routes';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Navbar className="p-3" color="dark" dark expand="md">
                <NavbarBrand href="/" className="ml-3">Pet Buddy Dashboard</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
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
                            <NavLink href={ROUTES.BOOKINGS} className="ml-3 text-uppercase">Bookings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={ROUTES.SETTINGS} className="ml-3 text-uppercase">Account Settings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={ROUTES.HOME} onClick={() => auth.signOut()} className="ml-3 text-uppercase">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default Navigation;
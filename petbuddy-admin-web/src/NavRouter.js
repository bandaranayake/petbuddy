import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginView from './containers/LoginView';
import ResetView from './containers/ResetView';
import DashboardView from './containers/DashboardView';
import CustomersView from './containers/CustomersView';
import CustomerDetailsView from './containers/CustomerDetailsView';
import PetsView from './containers/PetsView';
import PetDetailsView from './containers/PetDetailsView';
import PetSittersView from './containers/PetSittersView';
import ServicesView from './containers/ServicesView';
import BookingsView from './containers/BookingsView';
import BookingDetailsView from './containers/BookingDetailsView';
import SettingsView from './containers/SettingsView';
import ErrorPage from './containers/ErrorPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import * as ROUTES from './constants/routes';

function NavRouter(props) {
    const wrapWithHeader = (View, props) => {
        return (
            (window.innerWidth < 768) ? (
                <div>
                    <Navbar {...props} />
                    <View {...props} />
                </div>
            ) : (
                <div className='app'>
                    <Sidebar {...props} />
                    <View {...props} />
                </div>
            )
        );
    }

    if (props.isLoggedIn) {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.DASHBOARD} render={(props) => wrapWithHeader(DashboardView, props)} />
                    <Route exact path={ROUTES.CUSTOMERS} render={(props) => wrapWithHeader(CustomersView, props)} />
                    <Route exact path={ROUTES.PETSITTERS} render={(props) => wrapWithHeader(PetSittersView, props)} />
                    <Route exact path={ROUTES.SERVICES} render={(props) => wrapWithHeader(ServicesView, props)} />
                    <Route exact path={ROUTES.BOOKINGS} render={(props) => wrapWithHeader(BookingsView, props)} />
                    <Route exact path={ROUTES.SETTINGS} render={(props) => wrapWithHeader(SettingsView, props)} />
                    <Route exact path={`${ROUTES.CUSTOMERS}/:id`} render={(props) => wrapWithHeader(CustomerDetailsView, props)} />
                    <Route exact path={`${ROUTES.CUSTOMERS}/:id/pets`} render={(props) => wrapWithHeader(PetsView, props)} />
                    <Route exact path={`${ROUTES.CUSTOMERS}/:id/pets/:pid`} render={(props) => wrapWithHeader(PetDetailsView, props)} />
                    <Route exact path={`${ROUTES.BOOKINGS}/:id`} render={(props) => wrapWithHeader(BookingDetailsView, props)} />
                    <Route exact path="*" component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
    else {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={LoginView} />
                    <Route exact path={ROUTES.RESET} component={ResetView} />
                    <Route exact path="*" component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}

export default NavRouter;

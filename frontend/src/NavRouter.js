import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import LoginView from './containers/LoginView';
import ResetView from './containers/ResetView';
import DashboardView from './containers/DashboardView';
import CustomersView from './containers/CustomersView';
import PetSittersView from './containers/PetSittersView';
import ServicesView from './containers/ServicesView';
import BookingsView from './containers/BookingsView';
import SettingsView from './containers/SettingsView';
import ErrorPage from './containers/ErrorPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import * as ROUTES from './constants/routes';

export class NavRouter extends Component {
    wrapWithHeader = (View, props) => {
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

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={LoginView} />
                    <Route exact path={ROUTES.RESET} component={ResetView} />
                    <Route exact path={ROUTES.DASHBOARD} render={(props) => this.wrapWithHeader(DashboardView, props)} />
                    <Route exact path={ROUTES.CUSTOMERS} render={(props) => this.wrapWithHeader(CustomersView, props)} />
                    <Route exact path={ROUTES.PETSITTERS} render={(props) => this.wrapWithHeader(PetSittersView, props)} />
                    <Route exact path={ROUTES.SERVICES} render={(props) => this.wrapWithHeader(ServicesView, props)} />
                    <Route exact path={ROUTES.BOOKINGS} render={(props) => this.wrapWithHeader(BookingsView, props)} />
                    <Route exact path={ROUTES.SETTINGS} render={(props) => this.wrapWithHeader(SettingsView, props)} />
                    <Route exact path={ROUTES.LOGOUT} render={(props) => this.wrapWithHeader(PetSittersView, props)} />
                    <Route exact path="*" component={ErrorPage} />
                </Switch>
            </Router>
        )
    }
}

export default NavRouter

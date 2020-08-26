import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import LoginView from './components/LoginView';
import ResetView from './components/ResetView';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import PetSittersView from './components/PetSittersView';
import ServicesView from './components/ServicesView';
import BookingsView from './components/BookingsView';
import SettingsView from './components/SettingsView';
import ErrorPage from './components/ErrorPage';
import Sidebar from './components/Sidebar';

import * as ROUTES from './constants/routes';

export class NavRouter extends Component {
    wrapWithSidebar = (View, props) => {
        return (
            <div className='app'>
                <Sidebar {...props} />
                <View {...props} />
            </div>
        );
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={LoginView} />
                    <Route exact path={ROUTES.RESET} component={ResetView} />
                    <Route exact path={ROUTES.DASHBOARD} render={(props) => this.wrapWithSidebar(DashboardView, props)} />
                    <Route exact path={ROUTES.CUSTOMERS} render={(props) => this.wrapWithSidebar(CustomersView, props)} />
                    <Route exact path={ROUTES.PETSITTERS} render={(props) => this.wrapWithSidebar(PetSittersView, props)} />
                    <Route exact path={ROUTES.SERVICES} render={(props) => this.wrapWithSidebar(ServicesView, props)} />
                    <Route exact path={ROUTES.BOOKINGS} render={(props) => this.wrapWithSidebar(BookingsView, props)} />
                    <Route exact path={ROUTES.SETTINGS} render={(props) => this.wrapWithSidebar(SettingsView, props)} />
                    <Route exact path={ROUTES.LOGOUT} render={(props) => this.wrapWithSidebar(PetSittersView, props)} />
                    <Route exact path="*" component={ErrorPage} />
                </Switch>
            </Router>
        )
    }
}

export default NavRouter

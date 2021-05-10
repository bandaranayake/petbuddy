import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Table, Input } from 'reactstrap';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import { Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import { fetchCustomers, fetchMoreCustomers } from '../../actions/customerActions';

function CustomersView(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (props.customers == null || props.customers.length < 1) {
            props.fetchCustomers();
        }
    }, [])

    useEffect(() => {
        setData(props.customers);
    }, [props.customers])


    const handleDelete = (uid) => {

    }

    const renderRows = () => {
        return data.map((customer, i) =>
            <tr key={i}>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.city}</td>
                <td>{customer.phone}</td>
                <td>
                    <Link to={`${ROUTES.CUSTOMERS}/${customer.uid}/pets`}>View</Link>
                </td>
                <td>
                    <div style={{ textAlign: 'center' }}>
                        <Link className="btn btn-primary btn-md table-actions-btn" to={`${ROUTES.CUSTOMERS}/${customer.uid}`}>
                            <FaPencilAlt />
                        </Link>
                        <Button className="btn btn-danger btn-md table-actions-btn" onClick={() => handleDelete(customer.uid)}>
                            <FaBan />
                        </Button>
                    </div>
                </td>
            </tr>)
    }

    const LoadMoreCustomers = () => {
        props.fetchMoreCustomers(data[data.length - 1].uid)
    }

    return (
        <main className="px-5">
            <Row className="py-4">
                <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search Customers"
                />
            </Row>
            <Row>
                <Table responsive striped hover bordered>
                    <thead>
                        <tr>
                            <th width="20%">First Name</th>
                            <th width="20%">Last Name</th>
                            <th width="20%">City</th>
                            <th width="15%">Phone</th>
                            <th width="10%">Pets</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </Table>
                {props.isLoading ? <div className="w-100 d-flex justify-content-center"><Spinner color="secondary" /> </div> : null}
            </Row>
            <Button className="mt-2" disabled={props.isRefreshing || props.isLoading} onClick={() => LoadMoreCustomers()}>
                {props.isRefreshing ? <div><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" /> Loading...</div> : 'More'}
            </Button>
        </main>
    );
}

const mapStateToProps = state => ({
    customers: state.customers.items,
    isLoading: state.customers.isLoading,
    isRefreshing: state.customers.isRefreshing,
});

export default connect(mapStateToProps, { fetchCustomers, fetchMoreCustomers })(CustomersView);
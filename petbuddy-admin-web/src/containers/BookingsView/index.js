import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Row, Input } from 'reactstrap';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import { Button, Spinner } from 'reactstrap';
import * as ROUTES from '../../constants/routes';
import * as GLOBAL from '../../constants/global';
import { fetchBookings, fetchMoreBookings, deleteBooking } from '../../actions/bookingActions';

function BookingsView(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (props.bookings == null || props.bookings.length < 1) {
            props.fetchBookings();
        }
    }, [])

    useEffect(() => {
        setData(props.bookings);
    }, [props.bookings])


    const handleDelete = (id) => {
        props.deleteBooking(id);
    }

    const LoadMoreBookings = () => {
        props.fetchMoreBookings(data[data.length - 1].id)
    }

    const renderRows = () => {
        return data.map((booking, i) =>
            <tr key={i}>
                <td>{booking.fromDate + ' to ' + booking.toDate}</td>
                <td>{booking.petOwnerName}</td>
                <td>{booking.petSitterName}</td>
                <td>{booking.fee}</td>
                <td>{GLOBAL.FindLabel(booking.status, GLOBAL.STATUS)}</td>
                <td>
                    <div style={{ textAlign: 'center' }}>
                        <Link className="btn btn-primary btn-md table-actions-btn" to={`${ROUTES.BOOKINGS}/${booking.id}`}>
                            <FaPencilAlt />
                        </Link>
                        <Button className="btn btn-danger btn-md table-actions-btn" onClick={() => handleDelete(booking.id)}>
                            <FaBan />
                        </Button>
                    </div>
                </td>
            </tr>)
    }

    return (
        <main className="px-5">
            <Row className="py-4">
                <Input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search Bookings"
                />
            </Row>
            <Row>
                <Table responsive striped hover bordered>
                    <thead>
                        <tr>
                            <th width="25%">Dates</th>
                            <th width="20%">Customer</th>
                            <th width="20%">Pet Sitter</th>
                            <th width="10%">Price</th>
                            <th width="10%">Status</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </Table>
                {props.isLoading ? <div className="w-100 d-flex justify-content-center"><Spinner color="secondary" /> </div> : null}
            </Row>
            <Button className="mt-2" disabled={props.isRefreshing || props.isLoading} onClick={() => LoadMoreBookings()}>
                {props.isRefreshing ? <div><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" /> Loading...</div> : 'More'}
            </Button>
        </main>
    );
}

const mapStateToProps = state => ({
    bookings: state.bookings.items,
    isLoading: state.bookings.isLoading,
    isRefreshing: state.bookings.isRefreshing,
});

export default connect(mapStateToProps, { fetchBookings, fetchMoreBookings, deleteBooking })(BookingsView);
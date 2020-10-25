import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Row } from 'reactstrap'
import { FaPencilAlt, FaBan } from 'react-icons/fa';

export class BookingsView extends Component {
    render() {
        return (
            <main className="px-5">
                <Row className="py-4">
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
                            <tr>
                                <td>10/12/2020 - 10/11/2020</td>
                                <td>Mark Thornton</td>
                                <td>Mark Thornton</td>
                                <td>10$</td>
                                <td>Approved</td>
                                <td>
                                    <div style={{ textAlign: 'center' }}>
                                        <Link className="btn btn-primary btn-md table-actions-btn">
                                            <FaPencilAlt />
                                        </Link>
                                        <Link className="btn btn-danger btn-md table-actions-btn">
                                            <FaBan />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </main>
        )
    }
}

export default BookingsView

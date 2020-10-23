import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Row, Table, Input } from 'reactstrap'
import { FaPencilAlt, FaBan } from 'react-icons/fa';

export class PetSittersView extends Component {
    render() {
        return (
            <main className="px-5">
                <Row className="py-4">
                    <Input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search Pet Sitters"
                    />
                </Row>
                <Row>
                    <Table responsive striped hover bordered>
                        <thead>
                            <tr>
                                <th width="20%">Email</th>
                                <th width="20%">First Name</th>
                                <th width="20%">Second Name</th>
                                <th width="15%">Phone</th>
                                <th width="10%">Pets</th>
                                <th width="15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>mark.thornton@gmail.com</td>
                                <td>Mark</td>
                                <td>Thornton</td>
                                <td>+94771234567</td>
                                <td>
                                    <Link>1</Link>
                                </td>
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

export default PetSittersView

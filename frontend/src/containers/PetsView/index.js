import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Table, Row, Container, Form, FormGroup, Label, Col, Button, Input } from 'reactstrap'
import { FaPencilAlt, FaBan } from 'react-icons/fa';

export class PetsView extends Component {
    render() {
        return (
            <main className="px-5">
                <Container className="p-4">
                    <Table responsive striped hover bordered>
                        <thead>
                            <tr>
                                <th width="25%">Name</th>
                                <th width="20%">Type</th>
                                <th width="20%">Gender</th>
                                <th width="20%">Birthday</th>
                                <th width="15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cooper</td>
                                <td>Dog</td>
                                <td>Male</td>
                                <td>05/12/2018</td>
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
                </Container>
            </main >
        )
    }
}

export default PetsView

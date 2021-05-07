import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Row } from 'reactstrap';
import { FaPencilAlt, FaBan } from 'react-icons/fa';

function PetsView() {
    return (
        <main className="px-5">
            <Row className="py-4">
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
            </Row>
        </main >
    );
}

export default PetsView;

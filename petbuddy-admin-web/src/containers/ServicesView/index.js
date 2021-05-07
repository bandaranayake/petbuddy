import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Input } from 'reactstrap';
import { FaSave, FaBan } from 'react-icons/fa';

function ServicesView() {
    return (
        <main className="px-5">
            <Row className="py-4">
                <Table responsive hover bordered>
                    <thead>
                        <tr>
                            <th width="85%">Service Name</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> <Input type="text" value="Pet Sitting" /></td>
                            <td>
                                <div style={{ textAlign: 'center' }}>
                                    <Link className="btn btn-primary btn-md table-actions-btn">
                                        <FaSave />
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

export default ServicesView;

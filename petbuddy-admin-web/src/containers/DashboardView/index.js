import React from 'react';
import { Card, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

function Dashbaord() {
    return (
        <main className="px-5">
            <Row>
                <Col lg="3">
                    <Card body style={{ background: "#1d1d1d" }}>
                        <CardTitle tag="h4" style={{ color: "#d8d8d8" }}>0</CardTitle>
                        <CardSubtitle tag="h6" style={{ color: "#fff" }}>Users</CardSubtitle>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card body style={{ background: "#1d1d1d" }}>
                        <CardTitle tag="h4" style={{ color: "#d8d8d8" }}>0</CardTitle>
                        <CardSubtitle tag="h6" style={{ color: "#fff" }}>Pet Owners</CardSubtitle>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card body style={{ background: "#1d1d1d" }}>
                        <CardTitle tag="h4" style={{ color: "#d8d8d8" }}>0</CardTitle>
                        <CardSubtitle tag="h6" style={{ color: "#fff" }}>Service Providers</CardSubtitle>
                    </Card>
                </Col>
                <Col lg="3">
                    <Card body style={{ background: "#1d1d1d" }}>
                        <CardTitle tag="h4" style={{ color: "#d8d8d8" }}>0</CardTitle>
                        <CardSubtitle tag="h6" style={{ color: "#fff" }}>Bookings</CardSubtitle>
                    </Card>
                </Col>
            </Row>
        </main>
    );
}

export default Dashbaord;

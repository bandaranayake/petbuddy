import React, { useState, useEffect } from 'react';
import { Row, Container, Form, FormGroup, Label, Col, Button, Input, Spinner } from 'reactstrap';
import Select from 'react-dropdown-select';
import ReactStars from 'react-stars';
import { firestore } from '../../lib/firebase';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';

function BookingDetailsView(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [data, setData] = useState(null);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if (props.match.params != null && props.match.params.id != null) {
            setId(props.match.params.id);
        }
    }, [props.match.params])

    useEffect(() => {
        const fetchBooking = () => {
            setIsLoading(true);
            firestore
                .collection(COLLECTIONS.BOOKINGS)
                .doc(id)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.exists) {
                        setData({ ...querySnapshot.data(), id: querySnapshot.id })
                        setDetails({ ...querySnapshot.data() });
                    }
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false))
        }

        if (id != null) {
            fetchBooking();
        }
    }, [id])

    const deleteBooking = () => {
        firestore
            .collection(COLLECTIONS.BOOKINGS)
            .doc(id)
            .delete()
            .then(() => {
                setData(null);
                setDetails(null);
            })
    }

    const updateDetails = () => {
        if (details.fromDate == null) {
            setError('Please select the start date.');
        }
        else if (details.toDate == null) {
            setError('Please select the end date.');
        }
        else if (details.status == null) {
            setError('Please select the status.');
        }
        else {
            setError('');
            setIsUpdating(true);
            firestore
                .collection(COLLECTIONS.BOOKINGS)
                .doc(id)
                .update(details)
                .then(() => {
                    setData(details);
                    setIsUpdating(false)
                })
                .catch(() => setIsUpdating(false))
        }
    }

    if (isLoading) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><Spinner size="lg" /></div></main>
    }
    else if (data == null) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><span className="text-secondary">No data</span></div></main>
    }
    else {
        return (
            <main className="px-5" >
                <Container className="bg-light p-4">
                    <div className="p-2">
                        <Row>
                            <div className="container-md">
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="startdate">Start Date</Label>
                                                <Input type="date" name="startdate" id="startdate" value={details.fromDate} onChange={(e) => setDetails({ ...details, fromDate: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="enddate">End Date</Label>
                                                <Input type="date" name="enddate" id="enddate" value={details.toDate} onChange={(e) => setDetails({ ...details, toDate: e.target.value })} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="customer">Customer</Label>
                                                <Input type="text" name="customer" id="customer" value={details.petOwnerName} disabled />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="petsitter">Pet Sitter</Label>
                                                <Input type="text" name="petsitter" id="petsitter" value={details.petSitterName} disabled />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="service">Service</Label>
                                        <Input type="text" name="service" id="service" value={GLOBAL.FindLabel(details.service, GLOBAL.SERVICES)} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="status">Status</Label>
                                        <Select className="form-control" placeholder="Status" id="status" options={GLOBAL.STATUS} values={[GLOBAL.STATUS[details.status]]} onChange={(values) => setDetails({ ...details, status: values[0].value })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fee">Fee</Label>
                                        <Input type="text" name="fee" id="fee" value={details.fee + ' LKR'} disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Rating
                                        <ReactStars count={5} size={40} color2={'#ffd700'} half={false} edit={false} value={details.rating} />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="w-100 text-danger">{error}</Label>
                                        <Button className="mr-1 my-1 custom-class" disabled={isUpdating} onClick={() => updateDetails()}>{isUpdating ? <span><Spinner size="sm" /> Updating...</span> : 'Update Booking'}</Button>
                                        <Button className="my-1 custom-class" onClick={() => deleteBooking()}>Delete Booking</Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Row>
                    </div>
                </Container>
            </main >
        );
    }
}

export default BookingDetailsView;

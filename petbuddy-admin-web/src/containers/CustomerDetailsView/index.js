import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Container, Form, FormGroup, Label, Col, Button, Input, Spinner } from 'reactstrap';
import Select from 'react-dropdown-select';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import { firestore } from '../../lib/firebase';
import { ValidatePhone } from '../../utils/validation';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';
import { IMAGE_AVATAR } from '../../assets/images';

function CustomerDetailsView(props) {
    const [isCLoading, setIsCLoading] = useState(false);
    const [isPLoading, setIsPLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [id, setId] = useState(null);
    const [data, setData] = useState(null);
    const [pets, setPets] = useState(null);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.match.params != null && props.match.params.id != null) {
            setId(props.match.params.id);
        }
    }, [props.match.params])

    useEffect(() => {
        if (id != null) {
            fetchCustomer(id);
            fetchPets(id);
        }
    }, [id])

    const fetchCustomer = (id) => {
        setIsCLoading(true);
        firestore
            .collection(COLLECTIONS.PROFILES)
            .doc(id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.exists) {
                    setData({ ...querySnapshot.data(), uid: querySnapshot.id })
                    setDetails({ firstname: querySnapshot.data().firstname, lastname: querySnapshot.data().lastname, city: querySnapshot.data().city, phone: querySnapshot.data().phone });
                }
                setIsCLoading(false);
            })
            .catch(() => setIsCLoading(false))
    }

    const fetchPets = (id) => {
        setIsPLoading(true);

        firestore
            .collection(COLLECTIONS.PROFILES)
            .doc(id)
            .collection(COLLECTIONS.PETS)
            .get()
            .then(querySnapshot => {
                let data = querySnapshot.docs.map(document => {
                    return { ...document.data(), id: document.id };
                })

                setPets(data);
                setIsPLoading(false)
            })
            .catch(() => setIsPLoading(false))
    }

    const renderDetails = () => {
        return <Container className="bg-light p-4">
            <div className="p-2">
                <Row>
                    <div className="col-md-3 container-md text-center" style={{ minWidthidth: 160, maxWidth: 200 }}>
                        <img src={data.avatar ? data.avatar : IMAGE_AVATAR} className="img-fluid rounded-circle border" alt="Avatar" />
                        <h5 className="mt-1">{data.firstname + ' ' + data.lastname}</h5>
                    </div>
                    <div className="col-md-9 container-md">
                        <Form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="firstname">First Name</Label>
                                        <Input type="text" name="firstname" id="firstname" placeholder="First Name" value={details.firstname} onChange={(e) => setDetails({ ...details, firstname: e.target.value.trim() })} />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="lastname">Last Name</Label>
                                        <Input type="text" name="lastname" id="lastname" placeholder="Last Name" value={details.lastname} onChange={(e) => setDetails({ ...details, lastname: e.target.value.trim() })} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Select className="form-control" placeholder="City" id="city" options={GLOBAL.DISTRICTS} values={[GLOBAL.DISTRICTS[details.city]]} onChange={(values) => setDetails({ ...details, city: values[0].value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone Number</Label>
                                <Input type="tel" name="phone" id="phone" placeholder="Phone Number" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value.trim() })} />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Label className="w-100 mb-2 text-danger">{error}</Label>
                                <Button className="mr-1 my-1 custom-class" disabled={isUpdating} onClick={() => updateDetails()}>{isUpdating ? <span><Spinner size="sm" /> Updating...</span> : 'Update Account'}</Button>
                                <Button className="my-1 custom-class">Delete Account</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </Row>
            </div>
        </Container>
    }

    const renderPets = () => {
        return <Container className="py-4">
            <Row>
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
                    {(pets != null) ? renderRows() : null}
                </Table>
            </Row>
        </Container>
    }

    const renderRows = () => {
        return pets.map((pet, i) =>
            <tbody key={i}>
                <tr>
                    <td>{pet.name}</td>
                    <td>{GLOBAL.FindLabel(pet.type, GLOBAL.PETS)}</td>
                    <td>{GLOBAL.FindLabel(pet.gender, GLOBAL.GENDER)}</td>
                    <td>{pet.birthday}</td>
                    <td>
                        <div style={{ textAlign: 'center' }}>
                            <Link to={`${ROUTES.CUSTOMERS}/${id}/pets/${pet.id}`} className="btn btn-primary btn-md table-actions-btn">
                                <FaPencilAlt />
                            </Link>
                            <Button className="btn btn-danger btn-md table-actions-btn" onClick={() => deletePet(pet.id)}>
                                <FaBan />
                            </Button>
                        </div>
                    </td>
                </tr>
            </tbody>)
    }

    const deletePet = (pid) => {
        firestore
            .collection(COLLECTIONS.PROFILES)
            .doc(id)
            .collection(COLLECTIONS.PETS)
            .doc(pid)
            .delete()
            .then(() => {
                if (pets != null) {
                    let p = pets.filter((pet) => {
                        return pet.id !== pid
                    })
                    setPets(p);
                }
            })
    }

    const updateDetails = () => {
        if (details.firstname.length < 1) {
            setError('The first name field cannot be empty.');
        }
        else if (!details.firstname.match(/^[a-zA-Z]+$/)) {
            setError('The first name can only contain letters.');
        }
        else if (details.lastname.length < 1) {
            setError('The last name field cannot be empty.');
        }
        else if (!details.lastname.match(/^[a-zA-Z]+$/)) {
            setError('The last name can only contain letters.');
        }
        else if (!ValidatePhone(details.phone.trim())) {
            setError('Invalid phone number. Please provide a valid phone number.');
        }
        else if (details.city == null) {
            setError('Please select your current city.');
        }
        else {
            setError('');
            setIsUpdating(true);
            firestore.collection(COLLECTIONS.PROFILES)
                .doc(id)
                .update(details)
                .then(() => {
                    setData(details);
                    setIsUpdating(false)
                })
                .catch(() => setIsUpdating(false))
        }
    }

    if (isCLoading || isPLoading) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><Spinner size="lg" /></div></main>
    }
    else if (data == null) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><span className="text-secondary">No data</span></div></main>
    }
    else {
        return <main className="px-5">{renderDetails()}{renderPets()}</main>
    }
}

export default CustomerDetailsView;
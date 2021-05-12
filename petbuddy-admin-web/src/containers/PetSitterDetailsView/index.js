import React, { useState, useEffect } from 'react';
import { Row, Container, Form, FormGroup, Label, Col, Button, Input, CustomInput, Spinner } from 'reactstrap';
import Select from 'react-dropdown-select';
import { firestore } from '../../lib/firebase';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import { IMAGE_AVATAR } from '../../assets/images';

function PetSitterDetailsView(props) {
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);
    const [serviceDetails, setServiceDetails] = useState(null);
    const [petTypes, setPetTypes] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.match.params != null) {
            fetchPetSitter(props.match.params.id);
        }
    }, [props.match.params])

    const fetchPetSitter = (id) => {
        setIsLoading1(true);
        setIsLoading2(true);

        firestore
            .collection(COLLECTIONS.PROFILES)
            .doc(id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.exists) {
                    setDetails({ ...querySnapshot.data() });
                    setFname(querySnapshot.data().firstname);
                    setLname(querySnapshot.data().lastname);
                    setId(id);

                    let _petsTypes = [false, false, false, false, false];
                    querySnapshot.data().pets.forEach(index => _petsTypes[index] = true);
                    setPetTypes(_petsTypes);
                }
                setIsLoading1(false);
            })
            .catch(() => setIsLoading1(false))

        firestore
            .collection(COLLECTIONS.SERVICES)
            .doc(id)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.exists) {
                    setServiceDetails({ ...querySnapshot.data() });
                }
                setIsLoading2(false);
            })
            .catch(() => setIsLoading2(false))
    }

    const updateDetails = () => {

    }

    const handleDelete = () => {

    }

    const togglePetTypes = (key) => {
        let cloned = [...petTypes];
        cloned[key] = !cloned[key];

        setPetTypes(cloned);
    }

    const togglePreferences = (key) => {
        let cloned = [...serviceDetails.preferences];
        cloned[key] = !cloned[key];

        setServiceDetails({ ...serviceDetails, preferences: cloned });
    }

    const renderPetTypes = () => {
        return serviceDetails.preferences.map((pref, i) =>
            <Col md="4" key={i}>
                <CustomInput type="checkbox" id={'pref' + i} name={'pref' + i} label={GLOBAL.FindLabel(i, GLOBAL.PREFERENCES)} checked={pref} onChange={e => togglePreferences(i)} />
            </Col>
        )
    }

    const renderPreferences = () => {
        return GLOBAL.PETS.map((pet, i) =>
            <Col md="3" key={i}>
                <CustomInput type="checkbox" id={'pet' + i} name={'pet' + i} label={pet.label} checked={petTypes[i]} onChange={e => togglePetTypes(i)} />
            </Col>
        )
    }

    if (isLoading1 || isLoading2) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><Spinner size="lg" /></div></main>
    }
    else if (details == null) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><span className="text-secondary">No data</span></div></main>
    }
    else {
        return (
            <main className="px-5">
                <Container className="bg-light p-4">
                    <div className="p-2">
                        <Row>
                            <div className="col-md-3 container-md text-center" style={{ minWidthidth: 160, maxWidth: 200 }}>
                                <img src={details.avatar ? details.avatar : IMAGE_AVATAR} className="img-fluid rounded-circle border" alt="Avatar" />
                                <h5 className="mt-1">{fname + ' ' + lname}</h5>
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
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input type="text" name="about" id="about" placeholder="About" value={serviceDetails.about} onChange={(e) => setServiceDetails({ ...serviceDetails, about: e.target.value.trim() })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Allowed Pets</Label>
                                        <Row>{renderPetTypes()}</Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Preferences</Label>
                                        <Row>{renderPreferences()}</Row>
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="w-100 mb-2 text-danger">{error}</Label>
                                        <Button className="mr-1 my-1 custom-class" disabled={isUpdating} onClick={() => updateDetails()}>{isUpdating ? <span><Spinner size="sm" /> Updating...</span> : 'Update Account'}</Button>
                                        <Button className="my-1 custom-class" onClick={() => handleDelete()}>Delete Account</Button>
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

export default PetSitterDetailsView;

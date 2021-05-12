import React, { useState, useEffect } from 'react';
import { Row, Container, Form, FormGroup, Label, Button, Input, Spinner } from 'reactstrap';
import Select from 'react-dropdown-select';
import { firestore } from '../../lib/firebase';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import { IMAGE_AVATAR } from '../../assets/images';

function PetDetailsView(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [details, setDetails] = useState(null);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [id, setId] = useState(null);
    const [pid, setPid] = useState(null);

    useEffect(() => {
        if (props.match.params != null && props.match.params.id != null) {
            setId(props.match.params.id);
        }

        if (props.match.params != null && props.match.params.pid != null) {
            setPid(props.match.params.pid);
        }
    }, [props.match.params])

    useEffect(() => {
        const fetchPet = () => {
            setIsLoading(true);
            firestore
                .collection(COLLECTIONS.PROFILES)
                .doc(id)
                .collection(COLLECTIONS.PETS)
                .doc(pid)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.exists) {
                        setDetails({ ...querySnapshot.data() });
                        setName(querySnapshot.data().name);
                    }
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false))
        }

        if (id != null && pid != null) {
            fetchPet();
        }
    }, [id, pid])


    const deletePet = () => {
        firestore
            .collection(COLLECTIONS.PROFILES)
            .doc(id)
            .collection(COLLECTIONS.PETS)
            .doc(pid)
            .delete()
            .then(() => {
                setDetails(null);
            })
    }

    const updateDetails = () => {
        if (details.name.length < 1) {
            setError('The name field cannot be empty.');
        }
        else if (!details.name.match(/^[a-zA-Z]+$/)) {
            setError('The name can only contain letters.');
        }
        else if (details.type == null) {
            setError('Please select the pet type.');
        }
        else if (details.gender == null) {
            setError('Please select the gender.');
        }
        else if (details.birthday == null) {
            setError('Please select the birthday.');
        }
        else {
            setError('');
            setIsUpdating(true);
            firestore
                .collection(COLLECTIONS.PROFILES)
                .doc(id)
                .collection(COLLECTIONS.PETS)
                .doc(pid)
                .update(details)
                .then(() => setIsUpdating(false))
                .catch(() => setIsUpdating(false))
        }
    }

    if (isLoading) {
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
                            <div className="col-md-3 container-md text-center" style={{ minWidth: 160, maxWidth: 200 }}>
                                <img src={details.avatar ? details.avatar : IMAGE_AVATAR} className="img-fluid rounded-circle border" alt="Avatar" />
                                <h5 className="mt-1">{name}</h5>
                            </div>
                            <div className="col-md-9 container-md">
                                <Form>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input type="text" name="name" id="name" placeholder="Name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value.trim() })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pettype">Pet Type</Label>
                                        <Select className="form-control" placeholder="Pet Type" id="pettype" options={GLOBAL.PETS} values={[GLOBAL.PETS[details.type]]} onChange={(values) => setDetails({ ...details, type: values[0].value })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="gender">Gender</Label>
                                        <Select className="form-control" placeholder="Gender" id="gender" options={GLOBAL.GENDER} values={[GLOBAL.GENDER[details.gender]]} onChange={(values) => setDetails({ ...details, gender: values[0].value })} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="birthday">Birthday</Label>
                                        <Input type="date" name="birthday" id="birthday" value={details.birthday} onChange={(e) => setDetails({ ...details, birthday: e.target.value })} />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="w-100 mb-2 text-danger">{error}</Label>
                                        <Button className="mr-1 my-1 custom-class" disabled={isUpdating} onClick={() => updateDetails()}>{isUpdating ? <span><Spinner size="sm" /> Updating...</span> : 'Update Pet'}</Button>
                                        <Button className="my-1 custom-class" onClick={() => deletePet()}>Delete Pet</Button>
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

export default PetDetailsView;

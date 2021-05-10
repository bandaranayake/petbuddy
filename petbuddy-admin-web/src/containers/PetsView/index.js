import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Row, Spinner } from 'reactstrap';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import { firestore } from '../../lib/firebase';
import * as COLLECTIONS from '../../constants/collections';
import * as GLOBAL from '../../constants/global';
import * as ROUTES from '../../constants/routes';

function PetsView(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);
    const [pets, setPets] = useState(null);

    useEffect(() => {
        if (props.match.params != null && props.match.params.id != null) {
            setId(props.match.params.id);
        }
    }, [props.match.params])

    useEffect(() => {
        if (id != null) {
            fetchPets(id);
        }
    }, [id])

    const fetchPets = (id) => {
        setIsLoading(true);

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
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
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

    const renderRows = () => {
        return pets.map((pet, i) =>
            <tr key={i}>
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
            </tr>)
    }

    if (isLoading) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><Spinner size="lg" /></div></main>
    }
    else if (pets == null || pets.length < 1) {
        return <main className="px-5"> <div className="h-100 d-flex justify-content-center align-items-center"><span className="text-secondary">No data</span></div></main>
    }
    else {
        return <main className="px-5">
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
                        {renderRows()}
                    </tbody>
                </Table>
            </Row>
        </main>
    }
}

export default PetsView;

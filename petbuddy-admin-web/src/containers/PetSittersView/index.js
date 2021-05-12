import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Table, Input, Button, Spinner } from 'reactstrap';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import * as GLOBAL from '../../constants/global';
import { fetchPetSitters, fetchMorePetSitters } from '../../actions/petSitterAction';

function PetSittersView(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (props.petSitters == null || props.petSitters.length < 1) {
            props.fetchPetSitters();
        }
    }, [])

    useEffect(() => {
        setData(props.petSitters);
    }, [props.petSitters])

    const handleDelete = (uid) => {

    }

    const renderRows = () => {
        return data.map((petSitter, i) =>
            <tr key={i}>
                <td>{petSitter.firstname}</td>
                <td>{petSitter.lastname}</td>
                <td>{GLOBAL.FindLabel(petSitter.city, GLOBAL.DISTRICTS)}</td>
                <td>{petSitter.phone}</td>
                <td>{GLOBAL.FindLabel(petSitter.level, GLOBAL.LEVELS)}</td>
                <td>{petSitter.rating + ' (' + petSitter.jobcount + ')'}</td>
                <td>
                    <div style={{ textAlign: 'center' }}>
                        <Link className="btn btn-primary btn-md table-actions-btn" to={`${ROUTES.PETSITTERS}/${petSitter.uid}`}>
                            <FaPencilAlt />
                        </Link>
                        <Button className="btn btn-danger btn-md table-actions-btn" onClick={() => handleDelete(petSitter.uid)}>
                            <FaBan />
                        </Button>
                    </div>
                </td>
            </tr>)
    }

    const LoadMorePetSitters = () => {
        props.fetchMorePetSitters(data[data.length - 1].uid)
    }

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
                            <th width="15%">First Name</th>
                            <th width="15%">Last Name</th>
                            <th width="15%">City</th>
                            <th width="15%">Phone</th>
                            <th width="13%">Level</th>
                            <th width="12%">Rating</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </Table>
                {props.isLoading ? <div className="w-100 d-flex justify-content-center"><Spinner color="secondary" /> </div> : null}
            </Row>
            <Button className="mt-2" disabled={props.isRefreshing || props.isLoading} onClick={() => LoadMorePetSitters()}>
                {props.isRefreshing ? <div><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" /> Loading...</div> : 'More'}
            </Button>
        </main>
    );
}

const mapStateToProps = state => ({
    petSitters: state.petSitters.items,
    isLoading: state.petSitters.isLoading,
    isRefreshing: state.petSitters.isRefreshing,
});

export default connect(mapStateToProps, { fetchPetSitters, fetchMorePetSitters })(PetSittersView);